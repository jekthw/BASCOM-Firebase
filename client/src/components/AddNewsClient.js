'use client';

import React, { useEffect, useRef, useState } from 'react';

import InputField from '@/components/InputField';
import Button from '@/components/Buttons';

// Firestore property limit is 1048487 bytes; base64 is ~4/3 of file size, so cap file at ~786KB
const MAX_IMAGE_SIZE_BYTES = 765 * 1024; // ~765KB so base64 stays under 1048487

export default function AddNewsClient() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState(null);

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

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

    if (f.size > MAX_IMAGE_SIZE_BYTES) {
      alert(`Ukuran gambar melebihi batas ${Math.round(MAX_IMAGE_SIZE_BYTES / 1024)}KB. Silakan pilih gambar yang lebih kecil.`);
      setSelectedFile(null);
      setPreview(null);
      setImageData(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      return;
    }

    setSelectedFile(f);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result.startsWith('data:')) {
        setImageData(reader.result);
        setPreview(reader.result);
      } else {
        console.error("FileReader did not return a Data URL.");
        setImageData(null);
        setPreview(null);
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setImageData(null);
      setPreview(null);
    };
    reader.readAsDataURL(f);

    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
  };

  const submitNews = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let res;
      const payload = { title, summary, date, content, imageData };
      res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        console.error('Create news failed', await res.text());
        alert('Gagal membuat berita (cek console)');
        setIsSubmitting(false);
        return;
      }
      alert('Berita berhasil dibuat');
      setTitle('');
      setSummary('');
      setDate('');
      setContent('');
      setImageData(null);
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat membuat berita');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNews();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col'>
      <div className='container mx-auto flex items-center justify-center py-8 md:my-12 px-4 font-poppins'>
        <div className='w-full max-w-3xl'>
          <form className='bg-none sm:bg-white rounded-2xl sm:shadow-2xl overflow-hidden' onSubmit={handleSubmit}>
            <div className='p-6 md:p-7'>
              <div className='space-y-4 sm:space-y-5'>
                <h1 className='text-slate-900 text-lg font-bold'>Buat Berita</h1>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='title' className='text-slate-700 text-sm font-medium'>
                    Judul
                  </label>
                  <InputField className="ring-slate-200 text-slate-700" id='title' placeholder='Judul berita' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='summary' className='text-slate-700 text-sm font-medium'>
                    Ringkasan (untuk kartu)
                  </label>
                  <textarea
                    id='summary'
                    name='summary'
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder='Ringkasan singkat untuk tampilan kartu...'
                    className='mt-1 text-slate-700 p-2 block w-full border-gray-300 ring-slate-200  ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 '
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='date' className='text-slate-700 text-sm font-medium'>
                    Tanggal
                  </label>
                  <input
                    id='date'
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='mt-1 text-slate-700 p-2 block w-full border-gray-300 ring-slate-200  ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='content' className='text-slate-700 text-sm font-medium'>
                    Isi (opsional)
                  </label>
                  <textarea
                    id='content'
                    name='content'
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Isi lengkap berita...'
                    className='mt-1 text-slate-700 p-2 block w-full border-gray-300 ring-slate-200 ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 '
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-slate-700 text-sm font-medium'>Sumber Gambar</label>
                  <div className='flex gap-3 items-center'>
                    <button
                      type='button'
                      className='py-2 px-8 bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors rounded-md border border-slate-200'
                      onClick={handleFileClick}
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
                  {isSubmitting ? 'Submitting...' : 'Buat Berita'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
