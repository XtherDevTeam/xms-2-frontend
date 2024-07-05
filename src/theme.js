import { createTheme } from '@mui/material';

let darkTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #53433f",
          "color": "#ede0dc",
          "backgroundColor": "#3f3835",
          "&:before": {
            "backgroundColor": "#3f3835",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#362f2d",
            "color": "#ede0dc",
            "border": "0px solid #53433f"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#ede0dc"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#93000a",
          "color": "#ffdad6"
        },
        "standardInfo": {
          "background": "#00468c",
          "color": "#d6e3ff"
        },
        "standardWarning": {
          "background": "#703800",
          "color": "#ffdcc5"
        },
        "standardSuccess": {
          "background": "#314f00",
          "color": "#c2f280"
        },
        "filledError": {
          "background": "#ffb4ab",
          "color": "#690005"
        },
        "filledInfo": {
          "background": "#a9c7ff",
          "color": "#003063"
        },
        "filledWarning": {
          "background": "#ffb782",
          "color": "#4f2500"
        },
        "filledSuccess": {
          "background": "#a7d567",
          "color": "#203600"
        },
        "outlinedError": {
          "color": "#ffb4ab"
        },
        "outlinedInfo": {
          "color": "#a9c7ff"
        },
        "outlinedWarning": {
          "color": "#ffb782"
        },
        "outlinedSuccess": {
          "color": "#a7d567"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#251e1c",
          "color": "#ede0dc"
        },
        "colorPrimary": {
          "background": "#181210",
          "color": "#ede0dc"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ffb4ab",
              "color": "#690005"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#201a18",
            "color": "#ffb59c",
            "&:hover": {
              "background": "#302623",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#372c29"
            },
            "&:active": {
              "background": "#372c29"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(237, 224, 220, 0.12)",
              "color": "rgba(237, 224, 220, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#ffb59c",
            "color": "#5d1900",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(237, 224, 220, 0.12)",
              "color": "rgba(237, 224, 220, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#f1a68d",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#ea9f86",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#ea9f86",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#5d4036",
            "color": "#ffdbd0",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(237, 224, 220, 0.12)",
              "color": "rgba(237, 224, 220, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#694b41",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#6e5046",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#6e5046",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#ffb59c",
            "borderColor": "#a08d87",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(237, 224, 220, 0.12)",
              "color": "rgba(237, 224, 220, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#291f1c",
              "borderColor": "#a79089"
            },
            "&:focus": {
              "backgroundColor": "#312622",
              "borderColor": "#ffb59c"
            },
            "&:active": {
              "backgroundColor": "#312622",
              "borderColor": "#aa928a"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#ffb59c",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(237, 224, 220, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#291f1c"
            },
            "&:focus": {
              "backgroundColor": "#312622"
            },
            "&:active": {
              "backgroundColor": "#312622"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#201a18",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#302623",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#372c29"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#372c29"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(32, 26, 24, 0.38)",
              "color": "#53433f",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#3b3331",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#483d3a",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#4f423e"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#4f423e"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(59, 51, 49, 0.38)",
              "color": "#53433f",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#181210",
            "borderColor": "#a08d87",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#291f1c",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#312622"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#4f423e"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(59, 51, 49, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#251e1c",
          "color": "#d8c2bb"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#7c2e10",
            "color": "#ffdbd0",
            "&:hover": {
              "background": "#873b1e",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#8d4125",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#8d4125",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#5d4036",
            "color": "#ffdbd0",
            "&:hover": {
              "background": "#694b41",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#6e5046",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#6e5046",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#251e1c",
            "color": "#ffb59c",
            "&:hover": {
              "background": "#342a27",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#3c302c",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#3c302c",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#51461a",
            "color": "#f3e2a7",
            "&:hover": {
              "background": "#5c5124",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#625629",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#625629",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#d8c2bb",
          "&:hover": {
            "backgroundColor": "#2f2926",
            "color": "#dac4be"
          },
          "&:active": {
            "backgroundColor": "#382f2d",
            "color": "#dac5bf"
          },
          "&.Mui-selected": {
            "color": "#ffdbd0",
            "background": "#5d4036",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#694b41",
              "color": "#f0ccc1"
            },
            "&:active": {
              "backgroundColor": "#6e5046",
              "color": "#e8c5ba"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#201a18",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#ede0dc"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#a08d87",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#ffb59c",
                "opacity": 1,
                "border": 0
              },
              "& .MuiSwitch-thumb": {
                "color": "#5d1900",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(237, 224, 220, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(24, 18, 16, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#ffb59c",
              "border": "6px solid #5d1900"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(237, 224, 220, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#a08d87",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #a08d87",
            "backgroundColor": "#3b3331",
            "opacity": 1,
            "transition": "background .2s"
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#ede0dc",
          "&.Mui-selected": {
            "color": "#ffdbd0",
            "backgroundColor": "#5d4036"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#5d1900",
            "backgroundColor": "#ffb59c"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#a08d87",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#291f1c"
          },
          "&.Mui-selected:hover": {
            "background": "#694b41"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#ede0dc",
          "color": "#362f2d"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "dark",
    "primary": {
      "main": "#ffb59c",
      "contrastText": "#5d1900",
      "light": "rgb(255, 195, 175)",
      "dark": "rgb(178, 126, 109)"
    },
    "onPrimary": {
      "main": "#5d1900",
      "contrastText": "#ffb59c"
    },
    "primaryContainer": {
      "main": "#7c2e10",
      "contrastText": "#ffdbd0"
    },
    "onPrimaryContainer": {
      "main": "#ffdbd0",
      "contrastText": "#7c2e10"
    },
    "secondary": {
      "main": "#e7bdb0",
      "contrastText": "#442a21",
      "light": "rgb(235, 202, 191)",
      "dark": "rgb(161, 132, 123)"
    },
    "onSecondary": {
      "main": "#442a21",
      "contrastText": "#e7bdb0"
    },
    "secondaryContainer": {
      "main": "#5d4036",
      "contrastText": "#ffdbd0"
    },
    "onSecondaryContainer": {
      "main": "#ffdbd0",
      "contrastText": "#5d4036"
    },
    "tertiary": {
      "main": "#d6c68d",
      "contrastText": "#393005"
    },
    "onTertiary": {
      "main": "#393005",
      "contrastText": "#d6c68d"
    },
    "tertiaryContainer": {
      "main": "#51461a",
      "contrastText": "#f3e2a7"
    },
    "onTertiaryContainer": {
      "main": "#f3e2a7",
      "contrastText": "#51461a"
    },
    "error": {
      "main": "#ffb4ab",
      "contrastText": "#690005",
      "light": "rgb(255, 195, 187)",
      "dark": "rgb(178, 125, 119)"
    },
    "onError": {
      "main": "#690005",
      "contrastText": "#ffb4ab"
    },
    "errorContainer": {
      "main": "#93000a",
      "contrastText": "#ffdad6"
    },
    "onErrorContainer": {
      "main": "#ffdad6",
      "contrastText": "#93000a"
    },
    "primaryFixed": {
      "main": "#ffdbd0"
    },
    "primaryFixedDim": {
      "main": "#ffb59c"
    },
    "onPrimaryFixed": {
      "main": "#390c00"
    },
    "onPrimaryFixedVariant": {
      "main": "#7c2e10"
    },
    "secondaryFixed": {
      "main": "#ffdbd0"
    },
    "secondaryFixedDim": {
      "main": "#e7bdb0"
    },
    "onSecondaryFixed": {
      "main": "#2c160e"
    },
    "onSecondaryFixedVariant": {
      "main": "#5d4036"
    },
    "tertiaryFixed": {
      "main": "#f3e2a7"
    },
    "tertiaryFixedDim": {
      "main": "#d6c68d"
    },
    "onTertiaryFixed": {
      "main": "#221b00"
    },
    "onTertiaryFixedVariant": {
      "main": "#51461a"
    },
    "surface": {
      "main": "#181210",
      "contrastText": "#ede0dc"
    },
    "onSurface": {
      "main": "#ede0dc",
      "contrastText": "#181210"
    },
    "surfaceDim": {
      "main": "#181210"
    },
    "surfaceBright": {
      "main": "#3f3835"
    },
    "surfaceContainerLowest": {
      "main": "#120d0b"
    },
    "surfaceContainerLow": {
      "main": "#201a18"
    },
    "surfaceContainer": {
      "main": "#251e1c"
    },
    "surfaceContainerHigh": {
      "main": "#2f2826"
    },
    "surfaceContainerHighest": {
      "main": "#3b3331"
    },
    "surfaceVariant": {
      "main": "#53433f",
      "contrastText": "#d8c2bb"
    },
    "onSurfaceVariant": {
      "main": "#d8c2bb",
      "contrastText": "#53433f"
    },
    "outline": {
      "main": "#a08d87"
    },
    "outlineVariant": {
      "main": "#53433f"
    },
    "inversePrimary": {
      "main": "#9b4425",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#9b4425"
    },
    "inverseSurface": {
      "main": "#ede0dc",
      "contrastText": "#ede0dc"
    },
    "inverseOnSurface": {
      "main": "#362f2d",
      "contrastText": "#ede0dc"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#ffb59c"
    },
    "background": {
      "default": "#251e1c",
      "paper": "#181210"
    },
    "onBackground": {
      "main": "#ede0dc"
    },
    "common": {
      "white": "#181210",
      "black": "#ede0dc"
    },
    "text": {
      "primary": "#ede0dc",
      "secondary": "#ffdbd0",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#a9c7ff",
      "contrastText": "#003063",
      "light": "rgb(186, 210, 255)",
      "dark": "rgb(118, 139, 178)"
    },
    "onInfo": {
      "main": "#003063",
      "contrastText": "#a9c7ff"
    },
    "infoContainer": {
      "main": "#00468c",
      "contrastText": "#d6e3ff"
    },
    "onInfoContainer": {
      "main": "#d6e3ff",
      "contrastText": "#00468c"
    },
    "success": {
      "main": "#a7d567",
      "contrastText": "#203600",
      "light": "rgb(184, 221, 133)",
      "dark": "rgb(116, 149, 72)"
    },
    "onSuccess": {
      "main": "#203600",
      "contrastText": "#a7d567"
    },
    "successContainer": {
      "main": "#314f00",
      "contrastText": "#c2f280"
    },
    "onSuccessContainer": {
      "main": "#c2f280",
      "contrastText": "#314f00"
    },
    "warning": {
      "main": "#ffb782",
      "contrastText": "#4f2500",
      "light": "rgb(255, 197, 155)",
      "dark": "rgb(178, 128, 91)"
    },
    "onWarning": {
      "main": "#4f2500",
      "contrastText": "#ffb782"
    },
    "warningContainer": {
      "main": "#703800",
      "contrastText": "#ffdcc5"
    },
    "onWarningContainer": {
      "main": "#ffdcc5",
      "contrastText": "#703800"
    },
    "divider": "#a08d87",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#220500",
      "6": "#2b0700",
      "10": "#390c00",
      "12": "#400e00",
      "17": "#521500",
      "20": "#5d1900",
      "22": "#631c01",
      "24": "#692104",
      "30": "#7c2e10",
      "40": "#9b4425",
      "50": "#ba5c3b",
      "60": "#da7552",
      "70": "#fa8e69",
      "80": "#ffb59c",
      "87": "#ffd0c1",
      "90": "#ffdbd0",
      "92": "#ffe2d9",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#1c0904",
      "6": "#220e07",
      "10": "#2c160e",
      "12": "#311a12",
      "17": "#3d241b",
      "20": "#442a21",
      "22": "#492e25",
      "24": "#4e3229",
      "30": "#5d4036",
      "40": "#77574c",
      "50": "#926f64",
      "60": "#ad887d",
      "70": "#caa296",
      "80": "#e7bdb0",
      "87": "#fcd1c3",
      "90": "#ffdbd0",
      "92": "#ffe2d9",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#130e00",
      "6": "#191300",
      "10": "#221b00",
      "12": "#271f00",
      "17": "#332901",
      "20": "#393005",
      "22": "#3e3409",
      "24": "#43390d",
      "30": "#51461a",
      "40": "#6a5e2f",
      "50": "#847745",
      "60": "#9e905c",
      "70": "#baab74",
      "80": "#d6c68d",
      "87": "#ebda9f",
      "90": "#f3e2a7",
      "92": "#f9e8ac",
      "94": "#ffedb2",
      "95": "#fff0c2",
      "96": "#fff3d1",
      "98": "#fff9ee",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#120d0b",
      "6": "#181210",
      "10": "#201a18",
      "12": "#251e1c",
      "17": "#2f2826",
      "20": "#362f2d",
      "22": "#3b3331",
      "24": "#3f3835",
      "30": "#4d4543",
      "40": "#655c5a",
      "50": "#7f7572",
      "60": "#998e8b",
      "70": "#b4a9a6",
      "80": "#d0c4c0",
      "87": "#e4d7d4",
      "90": "#ede0dc",
      "92": "#f3e5e2",
      "94": "#f8ebe7",
      "95": "#fbeeea",
      "96": "#fef1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#160c08",
      "6": "#1c110d",
      "10": "#251915",
      "12": "#291d19",
      "17": "#342723",
      "20": "#3b2d29",
      "22": "#40322d",
      "24": "#443631",
      "30": "#53433f",
      "40": "#6b5b56",
      "50": "#85736e",
      "60": "#a08d87",
      "70": "#bca7a1",
      "80": "#d8c2bb",
      "87": "#ecd5ce",
      "90": "#f5ded7",
      "92": "#fbe3dc",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

let lightTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #d8c2bb",
          "color": "#201a18",
          "backgroundColor": "#fff8f6",
          "&:before": {
            "backgroundColor": "#fff8f6",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#fbeeea",
            "color": "#362f2d",
            "border": "0px solid #d8c2bb"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#201a18"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#ffdad6",
          "color": "#410002"
        },
        "standardInfo": {
          "background": "#d6e3ff",
          "color": "#001b3d"
        },
        "standardWarning": {
          "background": "#ffdcc5",
          "color": "#301400"
        },
        "standardSuccess": {
          "background": "#c2f280",
          "color": "#112000"
        },
        "filledError": {
          "background": "#ba1a1a",
          "color": "#ffffff"
        },
        "filledInfo": {
          "background": "#125db2",
          "color": "#ffffff"
        },
        "filledWarning": {
          "background": "#934b00",
          "color": "#ffffff"
        },
        "filledSuccess": {
          "background": "#426900",
          "color": "#ffffff"
        },
        "outlinedError": {
          "color": "#ba1a1a"
        },
        "outlinedInfo": {
          "color": "#125db2"
        },
        "outlinedWarning": {
          "color": "#934b00"
        },
        "outlinedSuccess": {
          "color": "#426900"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#f8ebe7",
          "color": "#201a18"
        },
        "colorPrimary": {
          "background": "#fff8f6",
          "color": "#201a18"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ba1a1a",
              "color": "#ffffff"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#fef1ed",
            "color": "#9b4425",
            "&:hover": {
              "background": "#f5e1db",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#f0dad2"
            },
            "&:active": {
              "background": "#f0dad2"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(32, 26, 24, 0.12)",
              "color": "rgba(32, 26, 24, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#9b4425",
            "color": "#ffffff",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(32, 26, 24, 0.12)",
              "color": "rgba(32, 26, 24, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#a35236",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#a7593e",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#a7593e",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#ffdbd0",
            "color": "#2c160e",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(32, 26, 24, 0.12)",
              "color": "rgba(32, 26, 24, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#ebc7bd",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#e1beb3",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#e1beb3",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#9b4425",
            "borderColor": "#85736e",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(32, 26, 24, 0.12)",
              "color": "rgba(32, 26, 24, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#f5e8e4",
              "borderColor": "#877069"
            },
            "&:focus": {
              "backgroundColor": "#f1e0da",
              "borderColor": "#9b4425"
            },
            "&:active": {
              "backgroundColor": "#f1e0da",
              "borderColor": "#886e67"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#9b4425",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(32, 26, 24, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#f5e8e4"
            },
            "&:focus": {
              "backgroundColor": "#f1e0da"
            },
            "&:active": {
              "backgroundColor": "#f1e0da"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#fef1ed",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#f5e1db",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#f0dad2"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#f0dad2"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(254, 241, 237, 0.38)",
              "color": "#f5ded7",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#ede0dc",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#e6d2cc",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#e2cbc4"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#e2cbc4"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(237, 224, 220, 0.38)",
              "color": "#f5ded7",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#fff8f6",
            "borderColor": "#85736e",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#f5e8e4",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#f1e0da"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#e2cbc4"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(237, 224, 220, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#f8ebe7",
          "color": "#53433f"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#ffdbd0",
            "color": "#390c00",
            "&:hover": {
              "background": "#edc7bb",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#e5bdb0",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#e5bdb0",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#ffdbd0",
            "color": "#2c160e",
            "&:hover": {
              "background": "#ebc7bd",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#e1beb3",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#e1beb3",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#f8ebe7",
            "color": "#9b4425",
            "&:hover": {
              "background": "#efdcd6",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#ebd5ce",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#ebd5ce",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#f3e2a7",
            "color": "#221b00",
            "&:hover": {
              "background": "#dfce96",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#d5c58e",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#d5c58e",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#53433f",
          "&:hover": {
            "backgroundColor": "#e8dbd7",
            "color": "#4f403c"
          },
          "&:active": {
            "backgroundColor": "#dfd0cb",
            "color": "#4d3e3a"
          },
          "&.Mui-selected": {
            "color": "#2c160e",
            "background": "#ffdbd0",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#ebc7bd",
              "color": "#3d241c"
            },
            "&:active": {
              "backgroundColor": "#e1beb3",
              "color": "#442b23"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#fef1ed",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#201a18"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#85736e",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#9b4425",
                "opacity": 1,
                "border": 0
              },
              "& .MuiSwitch-thumb": {
                "color": "#ffffff",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(32, 26, 24, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(255, 248, 246, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#9b4425",
              "border": "6px solid #ffffff"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(32, 26, 24, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#85736e",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #85736e",
            "backgroundColor": "#ede0dc",
            "opacity": 1,
            "transition": "background .2s"
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#201a18",
          "&.Mui-selected": {
            "color": "#2c160e",
            "backgroundColor": "#ffdbd0"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#ffffff",
            "backgroundColor": "#9b4425"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#85736e",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#f5e8e4"
          },
          "&.Mui-selected:hover": {
            "background": "#ebc7bd"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#362f2d",
          "color": "#fbeeea"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "light",
    "primary": {
      "main": "#9b4425",
      "contrastText": "#ffffff",
      "light": "rgb(175, 105, 80)",
      "dark": "rgb(108, 47, 25)"
    },
    "onPrimary": {
      "main": "#ffffff",
      "contrastText": "#9b4425"
    },
    "primaryContainer": {
      "main": "#ffdbd0",
      "contrastText": "#390c00"
    },
    "onPrimaryContainer": {
      "main": "#390c00",
      "contrastText": "#ffdbd0"
    },
    "secondary": {
      "main": "#77574c",
      "contrastText": "#ffffff",
      "light": "rgb(146, 120, 111)",
      "dark": "rgb(83, 60, 53)"
    },
    "onSecondary": {
      "main": "#ffffff",
      "contrastText": "#77574c"
    },
    "secondaryContainer": {
      "main": "#ffdbd0",
      "contrastText": "#2c160e"
    },
    "onSecondaryContainer": {
      "main": "#2c160e",
      "contrastText": "#ffdbd0"
    },
    "tertiary": {
      "main": "#6a5e2f",
      "contrastText": "#ffffff"
    },
    "onTertiary": {
      "main": "#ffffff",
      "contrastText": "#6a5e2f"
    },
    "tertiaryContainer": {
      "main": "#f3e2a7",
      "contrastText": "#221b00"
    },
    "onTertiaryContainer": {
      "main": "#221b00",
      "contrastText": "#f3e2a7"
    },
    "error": {
      "main": "#ba1a1a",
      "contrastText": "#ffffff",
      "light": "rgb(199, 71, 71)",
      "dark": "rgb(130, 18, 18)"
    },
    "onError": {
      "main": "#ffffff",
      "contrastText": "#ba1a1a"
    },
    "errorContainer": {
      "main": "#ffdad6",
      "contrastText": "#410002"
    },
    "onErrorContainer": {
      "main": "#410002",
      "contrastText": "#ffdad6"
    },
    "primaryFixed": {
      "main": "#ffdbd0"
    },
    "primaryFixedDim": {
      "main": "#ffb59c"
    },
    "onPrimaryFixed": {
      "main": "#390c00"
    },
    "onPrimaryFixedVariant": {
      "main": "#7c2e10"
    },
    "secondaryFixed": {
      "main": "#ffdbd0"
    },
    "secondaryFixedDim": {
      "main": "#e7bdb0"
    },
    "onSecondaryFixed": {
      "main": "#2c160e"
    },
    "onSecondaryFixedVariant": {
      "main": "#5d4036"
    },
    "tertiaryFixed": {
      "main": "#f3e2a7"
    },
    "tertiaryFixedDim": {
      "main": "#d6c68d"
    },
    "onTertiaryFixed": {
      "main": "#221b00"
    },
    "onTertiaryFixedVariant": {
      "main": "#51461a"
    },
    "surface": {
      "main": "#fff8f6",
      "contrastText": "#201a18"
    },
    "onSurface": {
      "main": "#201a18",
      "contrastText": "#fff8f6"
    },
    "surfaceDim": {
      "main": "#e4d7d4"
    },
    "surfaceBright": {
      "main": "#fff8f6"
    },
    "surfaceContainerLowest": {
      "main": "#ffffff"
    },
    "surfaceContainerLow": {
      "main": "#fef1ed"
    },
    "surfaceContainer": {
      "main": "#f8ebe7"
    },
    "surfaceContainerHigh": {
      "main": "#f3e5e2"
    },
    "surfaceContainerHighest": {
      "main": "#ede0dc"
    },
    "surfaceVariant": {
      "main": "#f5ded7",
      "contrastText": "#53433f"
    },
    "onSurfaceVariant": {
      "main": "#53433f",
      "contrastText": "#f5ded7"
    },
    "outline": {
      "main": "#85736e"
    },
    "outlineVariant": {
      "main": "#d8c2bb"
    },
    "inversePrimary": {
      "main": "#ffb59c",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#ffb59c"
    },
    "inverseSurface": {
      "main": "#362f2d",
      "contrastText": "#362f2d"
    },
    "inverseOnSurface": {
      "main": "#fbeeea",
      "contrastText": "#362f2d"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#9b4425"
    },
    "background": {
      "default": "#f8ebe7",
      "paper": "#fff8f6"
    },
    "onBackground": {
      "main": "#201a18"
    },
    "common": {
      "white": "#fff8f6",
      "black": "#201a18"
    },
    "text": {
      "primary": "#201a18",
      "secondary": "#2c160e",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#125db2",
      "contrastText": "#ffffff",
      "light": "rgb(65, 125, 193)",
      "dark": "rgb(12, 65, 124)"
    },
    "onInfo": {
      "main": "#ffffff",
      "contrastText": "#125db2"
    },
    "infoContainer": {
      "main": "#d6e3ff",
      "contrastText": "#001b3d"
    },
    "onInfoContainer": {
      "main": "#001b3d",
      "contrastText": "#d6e3ff"
    },
    "success": {
      "main": "#426900",
      "contrastText": "#ffffff",
      "light": "rgb(103, 135, 51)",
      "dark": "rgb(46, 73, 0)"
    },
    "onSuccess": {
      "main": "#ffffff",
      "contrastText": "#426900"
    },
    "successContainer": {
      "main": "#c2f280",
      "contrastText": "#112000"
    },
    "onSuccessContainer": {
      "main": "#112000",
      "contrastText": "#c2f280"
    },
    "warning": {
      "main": "#934b00",
      "contrastText": "#ffffff",
      "light": "rgb(168, 111, 51)",
      "dark": "rgb(102, 52, 0)"
    },
    "onWarning": {
      "main": "#ffffff",
      "contrastText": "#934b00"
    },
    "warningContainer": {
      "main": "#ffdcc5",
      "contrastText": "#301400"
    },
    "onWarningContainer": {
      "main": "#301400",
      "contrastText": "#ffdcc5"
    },
    "divider": "#85736e",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#220500",
      "6": "#2b0700",
      "10": "#390c00",
      "12": "#400e00",
      "17": "#521500",
      "20": "#5d1900",
      "22": "#631c01",
      "24": "#692104",
      "30": "#7c2e10",
      "40": "#9b4425",
      "50": "#ba5c3b",
      "60": "#da7552",
      "70": "#fa8e69",
      "80": "#ffb59c",
      "87": "#ffd0c1",
      "90": "#ffdbd0",
      "92": "#ffe2d9",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#1c0904",
      "6": "#220e07",
      "10": "#2c160e",
      "12": "#311a12",
      "17": "#3d241b",
      "20": "#442a21",
      "22": "#492e25",
      "24": "#4e3229",
      "30": "#5d4036",
      "40": "#77574c",
      "50": "#926f64",
      "60": "#ad887d",
      "70": "#caa296",
      "80": "#e7bdb0",
      "87": "#fcd1c3",
      "90": "#ffdbd0",
      "92": "#ffe2d9",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#130e00",
      "6": "#191300",
      "10": "#221b00",
      "12": "#271f00",
      "17": "#332901",
      "20": "#393005",
      "22": "#3e3409",
      "24": "#43390d",
      "30": "#51461a",
      "40": "#6a5e2f",
      "50": "#847745",
      "60": "#9e905c",
      "70": "#baab74",
      "80": "#d6c68d",
      "87": "#ebda9f",
      "90": "#f3e2a7",
      "92": "#f9e8ac",
      "94": "#ffedb2",
      "95": "#fff0c2",
      "96": "#fff3d1",
      "98": "#fff9ee",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#120d0b",
      "6": "#181210",
      "10": "#201a18",
      "12": "#251e1c",
      "17": "#2f2826",
      "20": "#362f2d",
      "22": "#3b3331",
      "24": "#3f3835",
      "30": "#4d4543",
      "40": "#655c5a",
      "50": "#7f7572",
      "60": "#998e8b",
      "70": "#b4a9a6",
      "80": "#d0c4c0",
      "87": "#e4d7d4",
      "90": "#ede0dc",
      "92": "#f3e5e2",
      "94": "#f8ebe7",
      "95": "#fbeeea",
      "96": "#fef1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#160c08",
      "6": "#1c110d",
      "10": "#251915",
      "12": "#291d19",
      "17": "#342723",
      "20": "#3b2d29",
      "22": "#40322d",
      "24": "#443631",
      "30": "#53433f",
      "40": "#6b5b56",
      "50": "#85736e",
      "60": "#a08d87",
      "70": "#bca7a1",
      "80": "#d8c2bb",
      "87": "#ecd5ce",
      "90": "#f5ded7",
      "92": "#fbe3dc",
      "94": "#ffe9e3",
      "95": "#ffede8",
      "96": "#fff1ed",
      "98": "#fff8f6",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

export default {
  light: createTheme(lightTheme),
  dark: createTheme(darkTheme)
}