"use client";
import { entries } from "mobx";
import { observer } from "mobx-react-lite";

import { panesMobx } from "./AppState";
import { PaneComponent } from "./PaneComponent";

export const PanesLayer = observer(() => {
  return (
    <div className="fixed left-0 top-0 z-10">
      {entries(panesMobx).map(([blockId, pane]) => {
        return (
          <PaneComponent pane={pane} key={blockId}>
            {pane.content}
          </PaneComponent>
        );
      })}
    </div>
  );
});
