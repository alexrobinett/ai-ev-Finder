'use client';
export default function ChatBubbles({messages, finished}, incoming) {
    

    return (
        <div className="flex flex-col">

        {messages.map((message, index) => {
            return (
                <div
                    key={index}
                    className={`flex ${
                        message.role !== "ai"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <div
                        className={`${
                            message.role !== "ai"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }  text-sm p-2 m-2 rounded-md max-w-sm`}
                    >
                        {message.message}
                    </div>
                </div>
                
            );
        })}

{!finished && (
                            <div className="flex justify-start bg-gray-200 text-2xl p-2 rounded-md mb-2 max-w-sm">
                                {incoming.message && incoming.message}
                            </div>
                            )
                        }
</div>
      
    )
  }
  