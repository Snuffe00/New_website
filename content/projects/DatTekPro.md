---
# HOW TO USE: copy this file into content/projects/ and rename it.
# The file name becomes the URL: my-project.md → /projects/my-project
# Lines starting with # are comments and are ignored. Delete optional lines you don't need.

# ── Required ─────────────────────────────────────────────
title: Computer Engineering project
description: First project at Chalmers
category: school # school | personal | work | competition
start: "2026-09" # year-month, in quotes

# ── Optional ─────────────────────────────────────────────
end: "2026-10" # leave out if you're still working on it
status: completed # completed | in-progress | paused
hours: 200 # estimated hours you put in
team: 7 # 1 = solo, otherwise number of people
role: Developer # what you did in the project
course: Dat-290 # school projects
organization: Chalmers
tags: [C, Latex]
#url: https://example.com # live demo / website
#repo: https://github.com/you/project # source code
featured: false # true = also shown on the home page
---

## Background

This was my first group project at Chalmers, in the course DAT290 (Datatekniskt projekt). Seven of us were asked to design and build a working alarm system for a museum, using MD307 microcontroller boards (RISC-V, CH32V307) and a set of sensors and other hardware. 

The system has three units that talk to each other over a CAN bus. A central unit connects to a PC over USART and drives a buzzer. A door alarm unit has a keypad, an LED and a 7-segment display. A motion alarm unit uses ultrasonic distance sensors and a vibration sensor. The central unit regularly pings the other two, and they reply with the status of all their sensors, so the system can raise the alarm as soon as something changes.


## What I did

I had two roles in the group. On the administrative side, I was in charge of documentation: I coordinated meeting notes, reports and submissions, and kept our shared drive organized so the whole group always knew where things were.

On the technical side, I wrote the driver for the ultrasonic distance sensors on the motion alarm unit. The module supports up to four HC-SR04+ sensors. It triggers them in turn, uses interrupts to time the echo pulses, and packs each sensor's status into one bit of the unit's status byte, which is sent over CAN. I also wrote the functions for the 7-segment display on the door alarm unit, using a lookup table of segment patterns. I presented the distance sensor at our project demo.


## Challenges

The hardest part was timing in the distance sensor. My first version used the wrong timer setup, and the measurements weren't reliable, so I rewrote the driver from scratch. In the new design, SysTick schedules which sensor to trigger next, a hardware timer (TIM2) measures how long each echo pulse lasts, and external interrupts (EXTI) catch the start and end of each pulse. Because the motion unit has its own startup file, I also had to add the interrupt handlers to its vector table by hand in assembly. That taught me to read the hardware documentation carefully instead of guessing.

Working in a group of seven was a challenge too. We split the system into clear modules, gave each unit its own half-port of pins, limited CAN traffic to three message types, and met every week with our supervisor. All of that kept seven people's code compatible with each other.


## What I learned

- Low-level embedded programming in C: GPIO, timers, interrupts and vector tables on a RISC-V microcontroller
- How CAN bus communication works
- Developing and debugging with a simulator (rv32emu) before testing on real hardware
- Using Git branches to develop a feature without disturbing the rest of the team
- How much structure, documentation and clear interfaces matter when many people build one system together
