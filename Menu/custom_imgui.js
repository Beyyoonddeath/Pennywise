export const access = (o, key) => {
    return (v = o[key]) => o[key] = v;
}

export const style = () => {
    let style  = ImGui.GetStyle();
    let colors = ImGui.GetStyle().Colors;

    style.Alpha              = 1.0;
    style.WindowPadding.x    = 8;
    style.WindowPadding.y    = 8;
    style.WindowTitleAlign.x = 0.5;
    style.WindowTitleAlign.y = 0.5;

    style.WindowRounding     = 8.0;
    style.PopupRounding      = 8.0;
    style.FrameRouding       = 8.0;
    style.ScrollbarRounding  = 5.0;
    style.GrabRounding       = 5.0;
    style.ChildRounding      = 5.0;
    style.SliderRouding      = 5.0;
    style.ButtonRouding      = 5.0;

    style.FramePadding.x           = 4;
    style.FramePadding.y           = 3;
    style.ItemSpacing.x            = 8;
    style.ItemSpacing.y            = 5;
    style.TouchExtraPadding.x      = 0;
    style.TouchExtraPadding.y      = 0;
    style.IndentSpacing            = 21.0;
    style.ColumnsMinSpacing        = 0.0;
    style.ScrollbarSize            = 6.0;
    style.GrabMinSize              = 5.0;
    style.ButtonTextAlign.x        = 0.5;
    style.ButtonTextAlign.y        = 0.5;
    style.DisplayWindowPadding.x   = 22;
    style.DisplayWindowPadding.y   = 22;
    style.DisplaySafeAreaPadding.x = 4;
    style.DisplaySafeAreaPadding.y = 4;
    style.AntiAliasedLines         = true;
    style.AntiAliasedFill          = true;
    style.CurveTessellationTol     = 1;

    colors[ImGui.Col.Text]                  = ImVec4(0.80, 0.80, 0.83, 1.00);
    colors[ImGui.Col.TextDisabled]          = ImVec4(0.24, 0.23, 0.29, 1.00);
    colors[ImGui.Col.WindowBg]              = ImVec4(0.06, 0.05, 0.07, 1.00);
    colors[ImGui.Col.ChildWindowBg]         = ImVec4(0.10, 0.10, 0.09, 1.00);
    colors[ImGui.Col.PopupBg]               = ImVec4(0.10, 0.10, 0.10, 1.00);
    colors[ImGui.Col.Border]                = ImVec4(0.80, 0.80, 0.83, 0.00);
    colors[ImGui.Col.BorderShadow]          = ImVec4(0.92, 0.91, 0.88, 0.10);
    colors[ImGui.Col.FrameBg]               = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.FrameBgHovered]        = ImVec4(0.24, 0.23, 0.29, 1.00);
    colors[ImGui.Col.FrameBgActive]         = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.TitleBg]               = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.TitleBgCollapsed]      = ImVec4(1.00, 0.98, 0.95, 0.75);
    colors[ImGui.Col.TitleBgActive]         = ImVec4(0.07, 0.07, 0.09, 1.00);
    colors[ImGui.Col.MenuBarBg]             = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.ScrollbarBg]           = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.ScrollbarGrab]         = ImVec4(0.80, 0.80, 0.83, 0.31);
    colors[ImGui.Col.ScrollbarGrabHovered]  = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.ScrollbarGrabActive]   = ImVec4(0.06, 0.05, 0.07, 1.00);
    colors[ImGui.Col.Separator]             = ImVec4(0.23, 0.23, 0.23, 1.00);
    colors[ImGui.Col.CheckMark]             = ImVec4(0.80, 0.80, 0.83, 0.31);
    colors[ImGui.Col.SliderGrab]            = ImVec4(0.80, 0.80, 0.83, 0.31);
    colors[ImGui.Col.SliderGrabActive]      = ImVec4(0.06, 0.05, 0.07, 1.00);
    colors[ImGui.Col.Button]                = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.ButtonHovered]         = ImVec4(0.24, 0.23, 0.29, 1.00);
    colors[ImGui.Col.ButtonActive]          = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.Header]                = ImVec4(0.10, 0.09, 0.12, 1.00);
    colors[ImGui.Col.HeaderHovered]         = ImVec4(0.24, 0.23, 0.29, 1.00);
    colors[ImGui.Col.HeaderActive]          = ImVec4(0.06, 0.05, 0.07, 1.00);
    colors[ImGui.Col.Column]                = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.ColumnHovered]         = ImVec4(0.24, 0.23, 0.29, 1.00);
    colors[ImGui.Col.ColumnActive]          = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.ResizeGrip]            = ImVec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.ResizeGripHovered]     = ImVec4(0.56, 0.56, 0.58, 1.00);
    colors[ImGui.Col.ResizeGripActive]      = ImVec4(0.06, 0.05, 0.07, 1.00);
    colors[ImGui.Col.PlotLines]             = ImVec4(0.40, 0.39, 0.38, 0.63);
    colors[ImGui.Col.PlotLinesHovered]      = ImVec4(0.25, 1.00, 0.00, 1.00);
    colors[ImGui.Col.PlotHistogram]         = ImVec4(0.40, 0.39, 0.38, 0.63);
    colors[ImGui.Col.PlotHistogramHovered]  = ImVec4(0.25, 1.00, 0.00, 1.00);
    colors[ImGui.Col.TextSelectedBg]        = ImVec4(0.25, 1.00, 0.00, 0.43);
    colors[ImGui.Col.ModalWindowDarkening]  = ImVec4(1.00, 0.98, 0.95, 0.73);
}

export const ImVec2 = (x, y) => {
    return new ImGui.Vec2(x, y);
}

export const ImVec4 = (x, y, z, w = 1.0) => {
    return new ImGui.Vec4(x, y, z, w);
}

export const getKeysWindow = (core, current) => {
    let result  = false,
        io      = ImGui.GetIO();

    ImGui.SetNextWindowSize(ImVec2(0, 0));

    ImGui.SetNextWindowPos(ImVec2(io.DisplaySize.x * 0.5, io.DisplaySize.y * 0.5), 
        ImGui.Cond.Always, ImVec2(0.5, 0.5));

    ImGui.SetNextWindowFocus();

    ImGui.Begin('press the key', null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize);
    ImGui.Text(`Current bind: ${JSON.stringify(current)}`);
    ImGui.Text(`Pressed keys: ${JSON.stringify(core.keyPressing.keyPresseds)}`);

    if (ImGui.Button('OK', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        result = JSON.parse(JSON.stringify(core.keyPressing.keyPresseds));

    ImGui.SameLine();

    if (ImGui.Button('Clear', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        core.keyPressing.keyPresseds = [];

    ImGui.SameLine();

    if (ImGui.Button('Cancel', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        result = true;

    ImGui.End();

    return result;
}

export const bindKey = (core, title, bind) => {
    if (ImGui.Button(title)) {
        bind.state = true;
    }

    if (bind.state) {
        let result = getKeysWindow(core, bind.keys);

        if (result !== false) {
            if (result !== true)
                bind.keys = result;

            bind.state = false;
        }
    }
}

ImGui.ImVec2 = function (x, y) {
    return new this.Vec2(x, y);
}

ImGui.Child = function(name, title, callBack, size = ImGui.ImVec2(0, 0)) {
    this.BeginChild(name, size, true, title ? ImGui.WindowFlags.MenuBar : undefined);

    if (title && this.BeginMenuBar()) {
        ImGui.TextCentered(title);
        ImGui.EndMenuBar();
    }

    callBack();
    this.EndChild();
}

ImGui.TextCentered = function(text) {
    const windowWidth = this.GetWindowSize().x;
    const textWidth   = this.CalcTextSize(text).x;

    this.SetCursorPosX((windowWidth - textWidth) * 0.5);
    this.Text(text);
}