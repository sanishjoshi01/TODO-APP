import ReactDOM from 'react-dom';

function Footer() {
    return ReactDOM.createPortal(
        <div className="bg-[#75DDDD] text-[#201E1F] py-10 text-center">
            Built by <a
                rel="noreferrer"
                target="_blank"
                href="https://sanishjoshi01.github.io/portfolio/"
                className='underline hover:text-white'
            >
                Sandesh Joshi
            </a>
        </div>,
        document.querySelector('#footer')
    )
}

export default Footer;