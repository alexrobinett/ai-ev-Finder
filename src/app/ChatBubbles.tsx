'use client';

type Message = {
    role: string;
    message: string;
};

type ChatBubblesProps = {
    messages: Message[];
};


export default function ChatBubbles({messages}: ChatBubblesProps ) {
    

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
</div>
      
    )
  }
  