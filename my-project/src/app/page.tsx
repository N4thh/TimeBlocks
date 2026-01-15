import AddBar from "../../components/addBar";
import NewBar from "../../components/newBar"; 

export default function Home() {
  return (
    <div>

      <main>
        <div>
           <h1 className="text-center text-3xl p-5"> Mini project TimeBlocks</h1>
           
            <div className="border rounded-2xl mx-5 p-5 flex">
           
              {/* NewBar - Chiếm hết không gian còn lại */}
              <div className="flex-1 flex justify-center items-center">
                <NewBar />
              </div>

              {/* AddBar - Cố định bên phải */}
              <div className="ml-auto bg-amber-300 w-[20vw] h-[25vh] relative">
                <AddBar />
              </div>
              
            </div>
        </div>
        
      </main>
      
    </div>
  );
}
