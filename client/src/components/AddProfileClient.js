'use client';

import React, { useEffect, useRef, useState } from 'react';

import InputField from '@/components/InputField';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Buttons';

export default function AddProfileClient() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [preview, setPreview] = useState(null);
  const [imageMode, setImageMode] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Revoke object URL when preview changes / unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedFile(f);
    const url = URL.createObjectURL(f);
    // revoke previous blob URL
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(url);
    setImageUrl(''); // clear imageUrl when uploading file
  };

  const handleImageUrlChange = (e) => {
    const v = e.target.value;
    setImageUrl(v);
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(v || null);
    setSelectedFile(null);
  };

  const submitProfile = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let res;
      if (imageMode === 'upload' && selectedFile) {
        const form = new FormData();
        form.append('name', name);
        form.append('title', title);
        form.append('year', year);
        form.append('content', content);
        form.append('imageFile', selectedFile);
        res = await fetch('/api/profiles', { method: 'POST', body: form });
      } else {
        const payload = { name, title, year, content, imageUrl };
        res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        console.error('Create profile failed', await res.text());
        alert('Gagal membuat profil (cek console)');
        setIsSubmitting(false);
        return;
      }
      alert('Profil berhasil dibuat');
      // reset form
      setName('');
      setTitle('');
      setYear('');
      setContent('');
      setImageUrl('');
      setSelectedFile(null);
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat membuat profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProfile();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col'>
      <div className='container mx-auto flex items-center justify-center py-8 md:my-12 px-4 font-poppins'>
        <div className='w-full max-w-3xl'>
          <form className='bg-none sm:bg-white rounded-2xl sm:shadow-2xl overflow-hidden' onSubmit={handleSubmit}>
            <div className='p-6 md:p-7'>
              <div className='space-y-4 sm:space-y-5'>
                <h1 className='text-slate-900 text-lg font-bold'>Buat Profil Alumni</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='name' className='text-slate-700 text-sm font-medium'>
                      Nama Lengkap
                    </label>
                    <InputField id='name' placeholder='Masukkan nama lengkap' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='title' className='text-slate-700 text-sm font-medium'>
                      Jabatan / Judul
                    </label>
                    <InputField id='title' placeholder='Contoh: Software Engineer, Angkatan 2019' value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='year' className='text-slate-700 text-sm font-medium'>
                      Tahun Lulus
                    </label>
                    <DatePicker id='year' onlyYear onYearChange={(y) => setYear(String(y))} valueYear={year} className="w-full" />
                  </div>
                  <div />{/* empty column to match layout */}
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='content' className='text-slate-700 text-sm font-medium'>
                    Profil / Isi Artikel
                  </label>
                  <textarea
                    id='content'
                    name='content'
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Ceritakan kisah alumni...'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-bc-blue focus:border-bc-blue'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-slate-700 text-sm font-medium'>Sumber Gambar</label>
                  <div className='flex gap-3 items-center'>
                    <button
                      type='button'
                      className='py-2 px-8 bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors rounded-md border border-slate-200'
                      onClick={() => {handleFileClick();
                      }}
                    >
                      Upload
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    id='imageFileInput'
                    name='imageFile'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />


                  {preview ? (
                    <div className='mt-3 w-40 h-40 overflow-hidden rounded-md border'>
                      <img src={preview} alt='preview' className='w-full h-full object-cover' />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='sm:bg-slate-50 px-4 sm:px-6 md:px-8 py-4 border-t border-slate-400 md:border-slate-200'>
              <div className='flex flex-col gap-4'>
                <Button variant='primary' className='!w-full' type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Buat Profil'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

