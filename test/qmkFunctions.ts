import { expect, config } from "chai";
import { QmkFunctionsExecutor } from "../src/QMK/functions";

const omit = (obj: object, keys: string[]) => {
    let a = Object.assign({}, obj);
    for (let k of keys) {
        delete (a as any)[k];
    }
    return a;
};

config.truncateThreshold = 0;
describe("qmk functions", () => {
    let qmkExecutor = new QmkFunctionsExecutor();
    it("modifier combinations LALT", () => {
        expect(omit(qmkExecutor.functions.LALT("KC_NO"), ["getKeycapText"])).to.be.deep.equal({
            type: "modresult",
            keycode: "KC_NO",
            mods: ["KC_LEFT_ALT"],
            modifierText: "Alt",
            rendered: { centered: "Alt", bottomcenter: false },
        });
    });
    it("modifier combinations nested", () => {
        let inner;
        inner = qmkExecutor.functions.LSFT("KC_NO");
        expect(omit(qmkExecutor.functions.LALT(inner), ["getKeycapText"])).to.be.deep.equal({
            type: "modresult",
            keycode: "KC_NO",
            mods: ["KC_LEFT_SHIFT", "KC_LEFT_ALT"],
            modifierText: "Sft+Alt",
            rendered: { centered: "Sft+Alt", bottomcenter: false },
        });
    });
    it("modifier combinations LALT", () => {
        expect(omit(qmkExecutor.functions.LALT("KC_LEFT_SHIFT"), ["getKeycapText"])).to.be.deep.equal({
            type: "modresult",
            keycode: "KC_NO",
            mods: ["KC_LEFT_SHIFT", "KC_LEFT_ALT"],
            modifierText: "Sft+Alt",
            rendered: { centered: "Sft+Alt", bottomcenter: false },
        });
    });
});
