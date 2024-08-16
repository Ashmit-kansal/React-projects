import TimerClock from "./components/TimerClock"


function App() {

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-green-700 text-white">
        <h1 >Timer Clock</h1>
        <TimerClock/>
      </div>
    </>
  )
}

export default App
