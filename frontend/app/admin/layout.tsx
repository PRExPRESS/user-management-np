import Provider from "../Providers/ThemeProvider";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Footer from "../Components/Footer";
import { AuthProvider } from "../context/AuthContext";
import AuthenticatedLayout from "./auth/layout";


import 'sweetalert2/src/sweetalert2.scss'


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>

    <AuthenticatedLayout>
      <Provider>
        <div className="container h-full flex flex-row">
          <Sidebar />
          <div className="w-full flex flex-col">
            <Topbar />
            {children}
            <Footer />
          </div>
        </div>
      </Provider>
    </AuthenticatedLayout>
    </AuthProvider>


  );
}
