"use client";

import { ChatCircleIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Chat</h2>
        <p className="text-muted-foreground">
          Start a conversation with your AI assistant
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-[500px]">
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-6">
            {/* Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {/* Example Messages */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                    <ChatCircleIcon className="size-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-none">
                    <p className="text-sm">
                      Hello! How can I assist you today?
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    2:30 PM
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div>
                    <div className="bg-primary text-primary-foreground p-3 rounded-none max-w-[80%] ml-auto">
                      <p className="text-sm">
                        I need help with my project
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      2:31 PM
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">U</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button>
                <PaperPlaneTiltIcon className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
