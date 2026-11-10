
export default function Modal({isOpen , mHeader,mBody,mFooter ,mainBg="#080F1E" }) {
    if(!isOpen) return null;

  return (
    <div className={`min-w-[400px] h-auto p-7 bg-[${mainBg}] rounded-lg`}>
        <div>{mHeader}</div>
        <div>{mBody}</div>
        <div>{mFooter}</div>

    </div>
  )
}
