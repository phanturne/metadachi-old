"use client";
import * as React from "react";
import { Tab, tabClasses, TabList, TabPanel, Tabs } from "@mui/joy";
import PromptList from "@/components/PromptList";
import AgentList from "@/components/AgentList";
import { ChatList } from "@/components/ChatList";

export default function CollectionsPage() {
  return (
    <Tabs
      aria-label="tabs"
      defaultValue="prompts"
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
        <Tab disableIndicator value="agents">
          Agents
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
        <PromptList variant="collection" />
      </TabPanel>

      <TabPanel value="agents">
        <AgentList />
      </TabPanel>

      <TabPanel value="chats">
        <ChatList />
      </TabPanel>

      <TabPanel value="images">Content for Images Tab</TabPanel>
      {/*<TabPanel value="pets">Content for Pets Tab</TabPanel>*/}
    </Tabs>
  );
}
