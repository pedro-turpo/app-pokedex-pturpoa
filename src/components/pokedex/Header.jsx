import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slices/nameTrainer.slice"

const Header = () => {

  const dispatch = useDispatch()

  const handleClickLogOut = () => {
    dispatch(setNameTrainer(""))
  }

  return (
    <section className="relative mb-6 max-w-[1440px] mx-auto">
      {/* Seccion Roja */}
      <div className="bg-red-600 h-20 relative px-4 py-1 flex justify-between items-end">
        <div className="w-[200px]">
          <img src="/images/logo.png" alt="" />
        </div>

        <button onClick={handleClickLogOut} className="text-3xl text-white"><i className='bx bx-log-out'></i></button>
      </div>

      {/* Seccion Negra */}
      <div className="bg-black h-12"></div>

      {/* Botton Pokebol */}
      <div className="h-20 aspect-square bg-white border-[6px] border-black rounded-full absolute -bottom-6 right-0 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:bg-gray-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-black ">
      </div>
    </section>
  )
}
export default Header