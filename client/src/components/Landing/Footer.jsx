

export default function Footer() {
  return (
    <footer>
        <div className="details flex flex-wrap lg:flex-nowrap gap-6 lg:gap-20 px-6 lg:px-16 py-8">
            <div className="hinode">
                <h4 className="brand flex gap-2 items-center text-lg font-bold py-2 text-gray-700">
                    <div className="logo bg-accent-gradient"></div>
                    Hinode 
                </h4>
                <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eveniet aperiam temporibus quisquam modi sit autem ipsum aliquid voluptate veritatis?</p>
            </div>
            <div className="links flex flex-col gap-2 lg:gap-4">
                <h4 className="text-md font-bold py-2 text-gray-700">Explore</h4>
                <a className="text-nowrap text-sm text-gray-500" href="#home">Home</a>
                <a className="text-nowrap text-sm text-gray-500" href="#product">Product</a>
                <a className="text-nowrap text-sm text-gray-500" href="#pricing">Pricing</a>
                <a className="text-nowrap text-sm text-gray-500" href="#testimonials">Testimonials</a>
            </div>
            <div className="links flex flex-col gap-2 lg:gap-4">
                <h4 className="text-md font-bold py-2 text-gray-700">Resources</h4>
                <a className="text-nowrap text-sm text-gray-500" href="#">Help Center</a>
                <a className="text-nowrap text-sm text-gray-500" href="#">FAQs</a>
                <a className="text-nowrap text-sm text-gray-500" href="#">Terms of Service</a>
                <a className="text-nowrap text-sm text-gray-500" href="#">Privacy Policy</a>
            </div>
            <div className="links flex flex-col gap-2 lg:gap-4">
                <h4 className="text-md font-bold py-2 text-gray-700">Get in Touch</h4>
                <p className="text-nowrap text-sm text-gray-500">Email: support@hinode.com</p>
                <p className="text-nowrap text-sm text-gray-500">Phone: (123) 456-7890</p>
                <p className="text-nowrap text-sm text-gray-500">Address: 123 Abcd, Efgh, Ijkl City, Philippines</p>
            </div>
        </div>
        <div className="copyright p-4 mx-2 lg:px-12 lg:mx-4 border-t border-gray-200 text-xs lg:text-sm text-gray-500">
            &copy; 2025 Hinode. Copyright and All rights reserved.
        </div>
    </footer>
  )
}
