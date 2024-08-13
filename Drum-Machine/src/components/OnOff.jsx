

export default function OnOff({onOff,value}) {
    
    return (
        <>
            <p>{value}</p>
            {onOff ? (
                <div className="w-10 h-4 bg-black">
                    <div className="w-[50%] h-[100%] bg-blue-900"></div>
                </div>
            ) : (
                <div className="w-10 h-4 bg-black flex justify-end">
                    <div className="w-[50%] h-[100%] bg-blue-900"></div>
                </div>
            )}
        </>
    )
}