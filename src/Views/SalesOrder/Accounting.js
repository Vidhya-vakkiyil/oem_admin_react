import { Button, Menu, MenuItem, MenuSeparator } from '@ui5/webcomponents-react';
import React, { useRef, useState } from 'react'

const Accounting = () => {
  const buttonRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <div>
      <Button
        ref={buttonRef}
        onClick={() => {
          setMenuIsOpen(true);
        }}
      >
        Open Action Sheet
      </Button>
      <Menu
        opener={buttonRef.current}
        open={menuIsOpen}
        onClose={() => {
          setMenuIsOpen(false);
        }}
              >
                <MenuItem icon="add-document" text="New File" />
                <MenuItem disabled icon="add-folder" text="New Folder" />
                <MenuSeparator />
                <MenuItem icon="open-folder" text="Open">
                  <MenuItem icon="open-folder" text="Open Locally">
                    <MenuItem text="Open C" />
                    <MenuItem text="Open D" />
                    <MenuItem text="Open E" />
                  </MenuItem>
                  <MenuItem icon="cloud" text="Open from Cloud" />
                </MenuItem>
                <MenuItem text="Close" />
                <MenuSeparator />
                <MenuItem icon="action-settings" text="Preferences" />
                <MenuItem icon="journey-arrive" text="Exit" />
              </Menu>
    </div>
  )
}

export default Accounting
