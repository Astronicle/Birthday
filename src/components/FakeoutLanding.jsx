import './fakeout.css'

function FakeoutLanding({ onNext }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-[#23272F]">
      <div className="flex flex-col items-center p-5 mb-6 text-center rounded-2xl">
        Wanna see what I made?
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="p-3 m-3 bg-emerald-300 w-30 rounded-2xl text-center"
          onClick={onNext}>
          Yes
        </button>
        <button className="p-3 m-3 bg-red-400 w-30 rounded-2xl text-center">
          No
        </button>
      </div>
    </div>
  )
}

export default FakeoutLanding
