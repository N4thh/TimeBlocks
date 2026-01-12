import AddBar from "../../components/addBar";

export default function Home() {
  return (
    <div>

      <main>
       <div>
         <h1 className="text-center text-3xl p-5"> Mini project TimeBlocks</h1>
        
        <div className="border rounded-2xl mx-5 p-5">
            <div className="ml-auto bg-amber-300 w-[20vw] h-[25vh] relative">
              <AddBar />
            </div>
        </div>
       </div>
      </main>
      
    </div>
  );
}
