/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { CSplitView } from "./splitView";
import i18next from "i18next";
import { createSignal } from "solid-js";
import { addI18nObserver } from "../../../i18n/config";

const translationKeys = {
  title: "splitview.title",
  position: "splitview.position",
  positionLeft: "splitview.position-left",
  positionRight: "splitview.position-right",
  flexRow: "splitview.flex-row",
  flexColumn: "splitview.flex-column",
  removeButton: "splitview.remove-button"
};

export function Popup(props: { ctx: CSplitView }) {
  const gSplitView = props.ctx;
  const [texts, setTexts] = createSignal({
    title: i18next.t(translationKeys.title),
    position: i18next.t(translationKeys.position),
    positionLeft: i18next.t(translationKeys.positionLeft),
    positionRight: i18next.t(translationKeys.positionRight),
    flexRow: i18next.t(translationKeys.flexRow),
    flexColumn: i18next.t(translationKeys.flexColumn),
    removeButton: i18next.t(translationKeys.removeButton)
  });

  addI18nObserver(() => {
    setTexts({
      title: i18next.t(translationKeys.title),
      position: i18next.t(translationKeys.position),
      positionLeft: i18next.t(translationKeys.positionLeft),
      positionRight: i18next.t(translationKeys.positionRight),
      flexRow: i18next.t(translationKeys.flexRow),
      flexColumn: i18next.t(translationKeys.flexColumn),
      removeButton: i18next.t(translationKeys.removeButton)
    });
  });

  return (
    <xul:panel
      id="splitView-panel"
      type="arrow"
      position="bottomleft topleft"
      onPopupShowing={gSplitView.updateSelectedItemState}
    >
      <xul:vbox id="splitView-box">
        <xul:vbox class="panel-header">
          <h1>
            {texts().title}
            <span data-l10n-id="split-view-title" />
          </h1>
        </xul:vbox>
        <xul:toolbarseparator />
        <xul:vbox id="splitView-vbox">
          <h3 class="splitView-title">
            {texts().position}
            <span data-l10n-id="split-view-position" />
          </h3>
          <xul:hbox id="splitView-position-selector">
            <xul:vbox
              id="splitView-position-selector-left"
              class="splitView-select-box"
              onClick={() =>
                gSplitView.handleSplitViewPanelRevseOptionClick(false)
              }
            >
              <label
                data-l10n-id="split-view-position-left"
                class="splitView-select-label"
                for="splitView-position-selector-content-left"
              >
                {texts().positionLeft}
              </label>
              <xul:hbox
                id="splitView-position-selector-content-left"
                class="splitView-select-content-box"
              >
                <xul:box />
                <xul:box />
              </xul:hbox>
            </xul:vbox>
            <xul:vbox
              id="splitView-position-selector-right"
              class="splitView-select-box"
              onClick={() =>
                gSplitView.handleSplitViewPanelRevseOptionClick(true)
              }
            >
              <label
                data-l10n-id="split-view-position-right"
                class="splitView-select-label"
                for="splitView-position-selector-content-right"
              >
                {texts().positionRight}
              </label>
              <xul:hbox
                id="splitView-position-selector-content-right"
                class="splitView-select-content-box"
              >
                <xul:box />
                <xul:box />
              </xul:hbox>
            </xul:vbox>
          </xul:hbox>
          <xul:toolbarseparator />
          <h3 class="splitView-title">{texts().title}</h3>
          <xul:hbox id="splitView-flex-selector">
            <xul:vbox
              id="splitView-flex-selector-row"
              class="splitView-select-box"
              onClick={() =>
                gSplitView.handleSplitViewPanelTypeOptionClick("row")
              }
            >
              <label
                data-l10n-id="split-view-flex-row"
                class="splitView-select-label"
                for="splitView-flex-selector-content-row"
              >
                {texts().flexRow}
              </label>
              <xul:hbox
                id="splitView-flex-selector-content-row"
                class="splitView-select-content-box"
              >
                <xul:box />
                <xul:box />
              </xul:hbox>
            </xul:vbox>
            <xul:vbox
              id="splitView-flex-selector-column"
              class="splitView-select-box"
              onClick={() =>
                gSplitView.handleSplitViewPanelTypeOptionClick("column")
              }
            >
              <label
                data-l10n-id="split-view-flex-column"
                class="splitView-select-label"
                for="splitView-flex-selector-content-column"
              >
                {texts().flexColumn}
              </label>
              <xul:vbox
                id="splitView-flex-selector-content-column"
                class="splitView-select-content-box"
              >
                <xul:box />
                <xul:box />
              </xul:vbox>
            </xul:vbox>
          </xul:hbox>
          <button
            id="splitView-remove-button"
            data-l10n-id="split-view-remove-button"
            class="footer-button"
            type="button"
            onClick={() => gSplitView.unsplitCurrentView()}
          >
            {texts().removeButton}
          </button>
        </xul:vbox>
      </xul:vbox>
    </xul:panel>
  );
}
