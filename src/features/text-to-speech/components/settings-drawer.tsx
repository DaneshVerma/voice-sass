import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SettingsPanelSettings } from "./settings-panel-settings";

interface SetttingsDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function SettingsDrawer({
  open,
  onOpenChange,
  children,
}: SetttingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <Settings className='size-4' />
          </Button>
        </DrawerTrigger>
      )}

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className='overflow-y-auto'>
          <SettingsPanelSettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
