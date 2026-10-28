/*
 * YOUR CONTENT LIVES HERE.
 * Edit the text between quotation marks; save this file and refresh your browser.
 * No framework, build step, or coding experience needed.
 *
 * Optional photo: put a picture in assets/ and set photo: "assets/me.jpg"
 * Résumé link: just put your own PDF at assets/resume.pdf.
 */

window.PORTFOLIO = {
  name: "Alex Nguyen",
  initials: "AN",
  role: "Purdue electrical engineering student",
  tagline: "",
  photo: "", // Example: "assets/profile.jpg". Leave empty to show initials.

  now: "I'm studying electrical engineering and working on hands-on projects involving audio and radio frequency.",


  email: "alexandernguyen176@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/alexlamnguyen" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/alexlamnguyen" },
    { label: "Email", url: "mailto:alexandernguyen176@gmail.com" }
  ],

  // These are example engineering projects. Edit, add, reorder, or delete entries.
  // Put your photos into assets/ and list their filenames in images: [...].
  projects: [
    {
      slug: "ieee-mtts",
      thumbnail: "assets/pll-3d.png",
      title: "ieee mtts synthetic aperture radar team",
      year: "2026",
      summary: "",
      details: "",
      tags: ["RF", "Altium", "PCB Layout"],
      images: [
        { src: "assets/pll-schem.png", alt: "PLL circuit schematic", caption: "PLL schematic", fullWidth: true },
        { src: "assets/pll-pcb.png", alt: "PLL printed circuit board routing and component layout", caption: "PLL board layout" },
        { src: "assets/pll-3d.png", alt: "Three-dimensional view of the PLL circuit board", caption: "PLL board · 3D view" }
      ],
      links: []
    },
    {
      slug: "tube-amplifier",
      thumbnail: "assets/vt-signalpcb.png",
      title: "vacuum tube headphone amplifier / preamplifier",
      year: "2026",
      summary: "low output impedance valve audio amplifier with a 6sn7 gain stage and an ecc99 cathode follower stage",
      details: "Designed, simulated, assembled, and tested an original headphone amplifier. Describe your design choices, technical challenges, and results here.",
      tags: ["Analog", "Audio", "PCB Design"],
      images: [
        { src: "assets/vt-signal.png", alt: "Vacuum tube amplifier signal schematic", caption: "Signal circuit", fullWidth: true },
        { src: "assets/vt-signalpcb.png", alt: "Vacuum tube amplifier signal PCB layout", caption: "Signal board layout", fullWidth: true },
        { src: "assets/vt-power.png", alt: "Vacuum tube amplifier power supply schematic", caption: "Power supply circuit", fullWidth: true },
        { src: "assets/vt-powerpcb.png", alt: "Vacuum tube amplifier power supply PCB layout", caption: "Power supply board layout", fullWidth: true }
      ],
      links: [] // Example: [{ label: "GitHub", url: "https://github.com/you/project" }]
    },
    {
      slug: "analog-synth",
      title: "modular analog audio synth",
      year: "2026",
      summary: "modular audio synthesizer with voltage controlled oscillators, filters, and amplifiers.",
      details: "",
      tags: ["Analog", "Audio"],
      images: [], // Example: ["assets/photo-1.jpg", "assets/photo-2.jpg"]
      links: []
    }

  ],

};
