const NAV_ITEMS = [
  { title: "Home", key: "Home", href: "index.html", links: [] },
  { 
    title: "The Project", 
    key: "Abstract", 
    links: [
      { label: "Abstract", href: "abstract.html" },
      { label: "Work Packages", href: "work-packages.html" }
    ] 
  },
  { 
    title: "Context", 
    key: "Context", 
    links: [{ label: "Context", href: "context.html" }] 
  },
  { 
    title: "Resources", 
    key: "Resources", 
    links: [{ label: "Resources", href: "resources.html" }] 
  },
  { 
    title: "F.A.Q.", 
    key: "FAQ", 
    links: [{ label: "FAQ", href: "FAQ.html" }] 
  },
  { 
    title: "About", 
    key: "Contacts", 
    links: [{ label: "Contacts", href: "contacts.html" }] 
  },
];

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openAcc, setOpenAcc] = React.useState(null);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const renderIcon = (name, size = 24) => {
    const props = {
      width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round"
    };
    if (name === "menu") {
      return React.createElement("svg", props,
        React.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
        React.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
        React.createElement("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
      );
    }
    if (name === "x") {
      return React.createElement("svg", props,
        React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      );
    }
    if (name === "chevron-down") {
      return React.createElement("svg", props,
        React.createElement("polyline", { points: "6 9 12 15 18 9" })
      );
    }
    return null;
  };

  return React.createElement(
    "header",
    { className: "w-full sticky top-0 z-50 header-blur shadow-md" },
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto flex justify-center items-center px-4 py-3" },
      // Desktop Nav
      React.createElement(
        "nav",
        { className: "hidden md:flex items-center gap-6" },
        NAV_ITEMS.map((item) =>
          item.links.length === 0
            ? React.createElement(
                "a",
                { key: item.key, href: item.href, className: "hover:text-primary-700 font-medium" },
                item.title
              )
            : React.createElement(
                "div",
                { key: item.key, className: "relative group py-1" },
                React.createElement(
                  "button",
                  { className: "flex items-center gap-1 hover:text-primary-700" },
                  item.title,
                  renderIcon("chevron-down", 16)
                ),
                React.createElement(
                  "div",
                  { className: "absolute left-0 top-full pt-1 hidden group-hover:block group-focus-within:block z-50" },
                  React.createElement(
                    "div",
                    { className: "bg-white shadow-lg rounded-xl p-3 w-48" },
                    item.links.map((link, i) =>
                      React.createElement(
                        "a",
                        { key: i, href: link.href, className: "block px-4 py-2 rounded hover:bg-gray-100" },
                        link.label
                      )
                    )
                  )
                )
              )
        )
      ),
      // Mobile Hamburger
      React.createElement(
        "button",
        {
          className: "md:hidden p-2 rounded hover:bg-gray-100",
          "aria-expanded": mobileOpen,
          onClick: () => setMobileOpen((v) => !v)
        },
        renderIcon(mobileOpen ? "x" : "menu", 28)
      )
    ),
    // Mobile Menu
    React.createElement(
      "nav",
      { className: "md:hidden bg-gray-50 border-t border-gray-100 " + (mobileOpen ? "" : "hidden") },
      React.createElement(
        "ul",
        { className: "px-2 py-2" },
        NAV_ITEMS.map((item) => {
          if (item.links.length === 0) {
            return React.createElement(
              "li",
              { key: item.key, className: "border-b border-gray-200" },
              React.createElement(
                "a",
                { href: item.href, className: "block px-3 py-3 font-medium" },
                item.title
              )
            );
          }
          const isOpen = openAcc === item.key;
          return React.createElement(
            "li",
            { key: item.key, className: "border-b border-gray-200" },
            React.createElement(
              "button",
              {
                className: "w-full flex items-center justify-between px-3 py-3 font-medium",
                onClick: () => setOpenAcc(isOpen ? null : item.key)
              },
              React.createElement("span", null, item.title),
              React.createElement(
                "span",
                { className: "transition-transform " + (isOpen ? "rotate-180" : "") },
                renderIcon("chevron-down", 20)
              )
            ),
            isOpen
              ? React.createElement(
                  "div",
                  { className: "pb-2" },
                  item.links.map((link, i) =>
                    React.createElement(
                      "a",
                      { key: i, href: link.href, className: "block px-6 py-2 rounded hover:bg-gray-100" },
                      link.label
                    )
                  )
                )
              : null
          );
        })
      )
    )
  );
}