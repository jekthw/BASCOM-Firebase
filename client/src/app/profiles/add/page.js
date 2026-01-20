import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddProfileClient from '@/components/AddProfileClient';

export const metadata = {
  title: "Add Profile | Bastyasaka Alumni",
  description: "Bastyasaka Alumni — Add Profile"
};

export default function Page() {
  return <div>

    <Header />
    <AddProfileClient />
    <Footer />
  </div>
}

