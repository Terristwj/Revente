const transitions = {
    fade: {
      in: {
        opacity: [0, 1]
      },
      out: {
        opacity: [1, 0]
      }
    },
  
    slideDown: {
      in: {
        opacity: [0, 1],
        translateY: ["20vh", 0]
      },
      out: {
        opacity: [1, 0],
        translateY: [0, "20vh"]
      }
    },
    slideLeft: {
      in: {
        opacity: [0, 1],
        translateX: ["-20vw", 0]
      },
      out: {
        opacity: [1, 0],
        translateX: [0, "-20vw"]
      }
    },
    slideRight: {
      in: {
        opacity: [0, 1],
        translateX: ["20vw", 0]
      },
      out: {
        opacity: [1, 0],
        translateX: [0, "20vw"]
      }
    },
    slideUp: {
      in: {
        opacity: [0, 1],
        translateY: ["-20vh", 0]
      },
      out: {
        opacity: [1, 0],
        translateY: [0, "-20vh"]
      }
    },
  
    revealDown: {
      in: {
        opacity: [0, 1],
        "-webkit-clip-path": ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
        clipPath: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
      },
      out: {
        opacity: [1, 0],
        "-webkit-clip-path": ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
      }
    },
  
    revealLeft: {
      in: {
        opacity: [0, 1],
        "-webkit-clip-path": ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"],
        clipPath: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
      },
      out: {
        opacity: [1, 0],
        "-webkit-clip-path": ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"],
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"]
      }
    },
  
    revealRight: {
      in: {
        opacity: [0, 1],
        "-webkit-clip-path": ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
        clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
      },
      out: {
        opacity: [1, 0],
        "-webkit-clip-path": ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"],
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"]
      }
    },
  
    revealUp: {
      in: {
        opacity: [0, 1],
        "-webkit-clip-path": ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
        clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      },
      out: {
        opacity: [1, 0],
        "-webkit-clip-path": ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"],
        clipPath: ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]
      }
    },
  
    bounceDown: {
      in: {
        easing: "easeOutBounce",
        opacity: [0, 1],
        translateY: ["20vh", 0]
      },
      out: {
        easing: "easeOutBounce",
        opacity: [1, 0],
        translateY: [0, "20vh"]
      }
    },
    bounceLeft: {
      in: {
        easing: "easeOutBounce",
        opacity: [0, 1],
        translateX: ["-20vw", 0]
      },
      out: {
        easing: "easeOutBounce",
        opacity: [1, 0],
        translateX: [0, "-20vw"]
      }
    },
    bounceRight: {
      in: {
        easing: "easeOutBounce",
        opacity: [0, 1],
        translateX: ["20vw", 0]
      },
      out: {
        easing: "easeOutBounce",
        opacity: [1, 0],
        translateX: [0, "20vw"]
      }
    },
    bounceUp: {
      in: {
        easing: "easeOutBounce",
        opacity: [0, 1],
        translateY: ["-20vh", 0]
      },
      out: {
        easing: "easeOutBounce",
        opacity: [1, 0],
        translateY: [0, "-20vh"]
      }
    },
  
    zoomIn: {
      in: {
        opacity: [0, 1],
        scaleX: [0, 1],
        scaleY: [0, 1],
      },
      out: {
        opacity: [1, 0],
        scaleX: [1, 0],
        scaleY: [1, 0]
      }
    },
  
    zoomOut: {
      in: {
        opacity: [0, 1],
        scaleX: [2, 1],
        scaleY: [2, 1]
      },
      out: {
        opacity: [1, 0],
        scaleX: [1, 2],
        scaleY: [1, 2]
      }
    },

    customzoomOut: {
      in: {
        opacity: [0, 1],
        scaleX: [3, 1],
        scaleY: [3, 1]
      },
      out: {
        opacity: [1, 0],
        scaleX: [1, 3],
        scaleY: [1, 3]
      }
    },
  
    flipX: {
      in: {
        opacity: [0, 1],
        rotateX: [90, 0]
      },
      out: {
        opacity: [1, 0],
        rotateX: [0, 90]
      }
    },
  
    flipY: {
      in: {
        opacity: [0, 1],
        rotateY: [360, 0]
      },
      out: {
        opacity: [1, 0],
        rotateY: [0, 90]
      }
    },
  
    rotateLeft: {
      in: {
        opacity: [0, 1],
        rotate: [360, 0]
      },
      out: {
        opacity: [1, 0],
        rotate: [0, 360]
      }
    },
  
    rotateRight: {
      in: {
        opacity: [0, 1],
        rotate: [-360, 0]
      },
      out: {
        opacity: [1, 0],
        rotate: [0, -360]
      }
    }
  };
  
  export default transitions;
  