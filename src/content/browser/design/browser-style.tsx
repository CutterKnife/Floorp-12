/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { insert } from "@solid-xul/solid-xul";
import { BrowserStyleElement } from "./browser-style-element";
import { BrowserDesignElement } from "./browser-design-element";

// initialize lepton
import("./lepton-config");

export class gFloorpDesignClass {
  private static get getBrowserDesignElement() {
    return document.querySelector("#browserdesign");
  }

  private readonly prefs = [
    "floorp.browser.user.interface",
    "floorp.fluerial.roundVerticalTabs",
  ];

  private static instance: gFloorpDesignClass;
  public static getInstance() {
    if (!gFloorpDesignClass.instance) {
      gFloorpDesignClass.instance = new gFloorpDesignClass();
    }
    return gFloorpDesignClass.instance;
  }

  constructor() {
    gFloorpDesignClass.setBrowserDesign();
    for (const pref of this.prefs) {
      Services.prefs.addObserver(pref, gFloorpDesignClass.setBrowserDesign);
    }

    Services.obs.addObserver(
      gFloorpDesignClass.setBrowserDesign,
      "update-photon-pref",
    );

    window.gURLBar._updateLayoutBreakoutDimensions();
    insert(
      document.head,
      <BrowserStyleElement />,
      document.head?.lastElementChild,
    );

    console.log("gFloorpDesignClass initialized");
  }

  public static setBrowserDesign() {
    gFloorpDesignClass.getBrowserDesignElement?.remove();

    insert(
      document.head,
      <BrowserDesignElement />,
      document.head?.lastElementChild,
    );

    setTimeout(() => {
      window.gURLBar._updateLayoutBreakoutDimensions();
    }, 100);

    setTimeout(() => {
      window.gURLBar._updateLayoutBreakoutDimensions();
    }, 500);
  }
}
