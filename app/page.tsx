import Converter from '@/components/Converter';

export default function HomePage() {
    return (
        <div className="relative flex justify-center items-center min-h-[calc(100vh-196px)] md:min-h-[calc(100vh-124px)] bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 sm:p-12 overflow-hidden">
            {/* Decorative Background Shapes */}
            <div className="absolute top-[-100px] left-[-150px] w-[300px] h-[300px] bg-blue-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40"></div>

            <Converter />
        </div>
    );
}
