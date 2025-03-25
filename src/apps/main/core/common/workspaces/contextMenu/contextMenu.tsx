/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { TWorkspaceID } from "../utils/type";
import { WorkspacesService } from "../workspacesService";
import i18next from "i18next";
import { createSignal } from "solid-js";
import { addI18nObserver } from "../../../../i18n/config";

// 翻訳キーを一箇所にまとめる
const translationKeys = {
  moveUp: "workspaces.context-menu.move-up",
  moveDown: "workspaces.context-menu.move-down",
  delete: "workspaces.context-menu.delete",
  manage: "workspaces.context-menu.manage"
};

// 現在の翻訳を取得する関数
const getTranslations = () => ({
  moveUp: i18next.t(translationKeys.moveUp),
  moveDown: i18next.t(translationKeys.moveDown),
  delete: i18next.t(translationKeys.delete),
  manage: i18next.t(translationKeys.manage)
});

export function ContextMenu(props: {
  disableBefore: boolean;
  disableAfter: boolean;
  contextWorkspaceId: TWorkspaceID;
  ctx: WorkspacesService
}) {
  // 翻訳テキストを管理するためのSignalを作成
  const [texts, setTexts] = createSignal(getTranslations());

  // 言語変更時に翻訳を更新
  addI18nObserver(() => {
    setTexts(getTranslations());
  });

  return (
    <>
      <xul:menuitem
        label={texts().moveUp}
        disabled={props.disableBefore}
        onCommand={() =>
          // IDはpropsとして受け取っているので検証は不要
          props.ctx.reorderWorkspaceUp(props.contextWorkspaceId)
        }
      />
      <xul:menuitem
        label={texts().moveDown}
        disabled={props.disableAfter}
        onCommand={() =>
          props.ctx.reorderWorkspaceDown(props.contextWorkspaceId)
        }
      />
      <xul:menuseparator class="workspaces-context-menu-separator" />
      <xul:menuitem
        label={texts().delete}
        onCommand={() =>
          props.ctx.deleteWorkspace(props.contextWorkspaceId)
        }
      />
      <xul:menuitem
        label={texts().manage}
        onCommand={() =>
          props.ctx.manageWorkspaceFromDialog(props.contextWorkspaceId)
        }
      />
    </>
  );
}
