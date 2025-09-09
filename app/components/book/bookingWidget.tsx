"use client";
import React, { useEffect, useRef } from "react";

function BookingWidget() {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//widget.simplybook.it/v2/widget/widget.js";
    script.onload = () => {
      new SimplybookWidget({
        widget_type: "iframe",
        url: "https:\/\/mohamedsefyanitest.simplybook.it",
        theme: "default",
        theme_settings: {
          timeline_hide_unavailable: "1",
          hide_past_days: "0",
          timeline_show_end_time: "0",
          timeline_modern_display: "as_slots",
          sb_base_color: "#0a0a0a",
          display_item_mode: "block",
          booking_nav_bg_color: "#1a1a1a",
          body_bg_color: "#f0f0f0",
          sb_review_image: "",
          dark_font_color: "#121212",
          light_font_color: "#f5fcff",
          btn_color_1: "#424242",
          sb_company_label_color: "#ffffff",
          hide_img_mode: "1",
          show_sidebar: "1",
          sb_busy: "#adadad",
          sb_available: "#e2eaec",
        },
        timeline: "modern",
        datepicker: "top_calendar",
        is_rtl: false,
        app_config: {
          clear_session: 0,
          allow_switch_to_ada: 0,
          predefined: [],
        },
        container_id: "sbw_jn43kj",
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="sbw_jn43kj" ref={widgetContainerRef}></div>;
}

export default BookingWidget;
