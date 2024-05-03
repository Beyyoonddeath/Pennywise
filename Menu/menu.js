import * as cImGui from "./custom_imgui.js";

const isLowerCase = (str) =>
  str == str.toLowerCase() && str != str.toUpperCase();

export default class {
  #core;
  isOpen = false;
  name = "Pennywise";

  constructor(core) {
    this.#core = core;
    (async () => {
      await ImGui.default();

      ImGui.CHECKVERSION();
      ImGui.CreateContext();
      const io = ImGui.GetIO();
      cImGui.style();
      io.Fonts.AddFontDefault();

      const output = document.getElementById("output") || document.body;
      const canvas = (unsafeWindow.canvas = document.createElement("canvas"));
      output.appendChild(canvas);
      canvas.id = "canvas__imgui";
      canvas.tabIndex = 0;
      canvas.style.position = "absolute";
      canvas.style.left = "0px";
      canvas.style.right = "0px";
      canvas.style.top = "0px";
      canvas.style.bottom = "0px";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "1000";
      canvas.style.visibility = "hidden";

      canvas.getContext("webgl2", { alpha: true }) ||
        canvas.getContext("webgl", { alpha: true });
    })();

    document.addEventListener("keyup", (e) => {
      if (core.utils.isChatOpen()) return;

      switch (e.code) {
        case "Insert":
        case "Numpad0":
        case "Slash":
          this.onMenuKeyPressed();
          break;
      }
    });
  }

  showMenu = () => {
    ImGui_Impl.Init(canvas),
      (canvas.style.visibility = ""),
      document.exitPointerLock(),
      requestAnimationFrame(this.process);
  };

  hideMenu = () => {
    ImGui_Impl.Shutdown(),
      (canvas.style.visibility = "hidden"),
      this.#core.config.saveStates();
  };

  onMenuKeyPressed = () => {
    (this.isOpen = !this.isOpen) ? this.showMenu() : this.hideMenu();
  };

  process = (time) => {
    if (!this.isOpen) return;

    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    const main_viewport = ImGui.GetMainViewport();
    ImGui.SetNextWindowPos(
      new ImGui.Vec2(
        main_viewport.WorkPos.x + 650,
        main_viewport.WorkPos.y + 20
      ),
      ImGui.Cond.FirstUseEver
    );
    ImGui.SetNextWindowSize(new ImGui.Vec2(850, 450), ImGui.Cond.FirstUseEver);

    ImGui.Begin(
      "vevr",
      null,
      ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoTitleBar
    );

    ImGui.Child("##child", this.name, () => {
      if (ImGui.CollapsingHeader("Physics")) {
        ImGui.TextCentered(
          "Physics features helps give you a huge advantage in the game."
        );
        ImGui.Separator();

        ImGui.TextCentered("Recoil - increases the recoil of your weapon");
        ImGui.TextCentered("Gravity - changes the gravity of your hull");
        ImGui.Separator();

        ImGui.Checkbox(
          "Recoil##physics",
          cImGui.access(this.#core.cfg.physics.recoil, "state")
        );

        ImGui.Checkbox(
          "Gravity##physics",
          cImGui.access(this.#core.cfg.physics.gravity, "state")
        );

        ImGui.SliderInt(
          "Gravity##grVal",
          cImGui.access(this.#core.cfg.physics.gravity, "value"),
          -1000,
          1000
        );
      }

      if (ImGui.CollapsingHeader("Mines")) {
        ImGui.TextCentered("Removes mines on the map to increase fps");
        ImGui.Separator();

        ImGui.TextCentered("Remove Mines - removes all mines");
        ImGui.TextCentered(
          "Disabled repeats - disable mines with repeating position (long execution)"
        );
        ImGui.TextCentered(
          "Mines Counter - displays the number of mines currently visible to you"
        );
        ImGui.Separator();

        ImGui.Checkbox(
          "State##mines",
          cImGui.access(this.#core.cfg.mines.removeMines, "state")
        );
        ImGui.Checkbox(
          "Counter##mines",
          cImGui.access(this.#core.cfg.mines.counter, "state")
        );

        if (ImGui.Button("Disable repeats")) {
          this.#core.features.mines.disableRepeats();
        }
      }

      if (ImGui.CollapsingHeader("Other")) {
        ImGui.TextCentered(
          "FOV - the angular extent of the observable world that is seen at any given moment."
        );
        ImGui.TextCentered(
          "Through Walls - sets the visibility of nicknames through walls"
        );
        ImGui.Separator();

        ImGui.Checkbox(
          "Through Walls##other",
          cImGui.access(this.#core.cfg.other.tw, "state")
        );

        ImGui.Checkbox(
          "FOV##other",
          cImGui.access(this.#core.cfg.other.fov, "state")
        );

        ImGui.SliderFloat(
          "Value##fovVal",
          cImGui.access(this.#core.cfg.other.fov, "value"),
          1.0471976,
          2.04
        );
      }

      ImGui.Text(
        `Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(
          3
        )} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`
      );
    });

    ImGui.End();

    ImGui.EndFrame();
    ImGui.Render();
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
    requestAnimationFrame(this.process);
  };
}
