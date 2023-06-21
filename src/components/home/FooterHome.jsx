import '../styles/footerHome.css'
const FooterHome = () => {
    return (
        <section className="relative">
            {/* Seccion Roja */}
            <div className="bg-red-600 h-20"></div>

            {/* Seccion Negra */}
            <div className="bg-black h-14"></div>

            {/* Botton Pokebol */}
            <div className="h-24 aspect-square bg-white border-[10px] border-black rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:bg-gray-700 after:rounded-full after:absolute after:top-1/2
             after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] after:border-black"></div>

        </section>
    )
}
export default FooterHome