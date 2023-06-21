import { useDispatch } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainer(nameTrainer))
        navigate("/pokedex")
    }

    return (
        <main className="grid grid-rows-[1fr_auto] min-h-screen">
            {/* Seccion superior */}
            <section className="flex flex-col justify-center items-center">
                <div className="px-5 pb-5">
                    <img src="/images/logo.png" alt="" />
                </div>
                <h3 className="text-[28px] text-[#FE1936] font-bold">Hello trainer!</h3>
                <p className="pb-5 font-semibold">To get started, enter your name</p>

                <form onSubmit={handleSubmit} className="w-full flex justify-center">
                    <input required id="nameTrainer" type="text" placeholder="Your name..." autoComplete="off" className="py-2 px-4 w-[220px] outline-none shadow-lg"/>
                    <button className="p-2 text-white bg-[#D93F3F]">Start!</button>
                </form>
            </section>

            {/* Seccion inferior */}
            <section>
                <FooterHome />
            </section>
        </main>
    )
}
export default Home