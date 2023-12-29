"use client";
import * as React from "react";
import { Tab, tabClasses, TabList, TabPanel, Tabs } from "@mui/joy";
import PromptsList from "@/components/PromptsList";
import BotsList from "@/components/BotsList";
import { ChatList } from "@/components/ChatList";

export default function CollectionsPage() {
  return (
    <Tabs
      aria-label="tabs"
      defaultValue="bots"
      sx={{
        bgColor: "transparent",
        overflowY: "scroll",
        p: 3,
      }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "xl",
          bgColor: "background.level1",
          width: 425,
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgColor: "background.surface",
          },
        }}
      >
        <Tab disableIndicator value="prompts">
          Prompts
        </Tab>
        <Tab disableIndicator value="bots">
          Bots
        </Tab>
        <Tab disableIndicator value="chats">
          Chats
        </Tab>
        <Tab disableIndicator value="images">
          Images
        </Tab>
        {/*<Tab disableIndicator value="pets">*/}
        {/*  Pets*/}
        {/*</Tab>*/}
      </TabList>

      <TabPanel value="prompts">
        <PromptsList />
      </TabPanel>

      <TabPanel value="bots">
        <BotsList />
      </TabPanel>

      <TabPanel value="chats">
        <ChatList />
      </TabPanel>

      <TabPanel value="images">Content for Images Tab</TabPanel>
      {/*<TabPanel value="pets">Content for Pets Tab</TabPanel>*/}
    </Tabs>
  );
}
