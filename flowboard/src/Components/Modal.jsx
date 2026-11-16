
export default function Modal({modalContent,isOpen = false ,mainBg="#080F1E" }) {
    if(!isOpen) return null;

  return (
    <div className={`h-[100%] w-[100%] rounded-lg fixed top-0 left-[50%] translate-x-[-50%] flex items-center justify-center
                    z-30   backdrop-blur-sm`}
      style={{
        backgroundColor: mainBg
      }}>
        <div className="min-w-[400px] min-h-[400px]  h-[auto] w-[60%] rounded-lg 
                     border-2 p-5 backdrop-blur-lg">{modalContent}</div>
        

    </div>
  )
}
