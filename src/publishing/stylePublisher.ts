/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import * as Utils from "@paperbits/common/utils";
import { IPublisher } from "@paperbits/common/publishing";
import { IBlobStorage } from "@paperbits/common/persistence";
import { StyleCompiler } from "../styleCompiler";

export class StylePublisher implements IPublisher {
    constructor(
        private readonly styleCompiler: StyleCompiler,
        private readonly outputBlobStorage: IBlobStorage,
    ) { }

    public async publish(): Promise<void> {
        try {
            console.log("Publishing styles...");

            const css = await this.styleCompiler.compile();
            const bytes = Utils.stringToUnit8Array(css);

            await this.outputBlobStorage.uploadBlob(`styles/customizations.css`, bytes, "text/css");
        }
        catch (error) {
            console.error(error);
        }
    }
}