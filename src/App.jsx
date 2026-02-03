import "./styles/style.scss"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Game } from "./pages/Game"
import { Routes, Route } from "react-router"
import { Footer } from "./components/Footer"
import { ScrollUp } from "./components/ScrollUp"
import { Result } from "./pages/Result"

export function App() {
  return (
    <>
      {/* NAV */}
      <Header/>
      {/* Router */}
      <Routes>
        <Route path="/" element={<><Home/><Footer/></>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/result" element={<Result/>}/>
        {/* <Route path="/test" element={<Test/>}/> */}
        <Route path="/*" element={<><NotFound/><Footer/></>}/>
      </Routes>
      <ScrollUp/>
    </>
  )
}