export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
    {
    slug: 'visualizing-simulations',
    title: 'Visualizing Simulations',
    description: 'Developed a method of using blender to visualize .ply files.',
    longDescription: `This was a project for Dr. Strasser from Liberty University. The goal of this project was to come up with a way to use Blender to convert a stream .ply files into .jpeg files in order to visualise the simualtion as a 
    video. I found a Blender extention called Stop-Motion-OBJ that was supposed to do what I needed. After some testing, I found it was able to convert the .ply files if they were able to fit in ram, or if they could quickly be loaded into ram.
    My files were neither so I had to find another solution. The issue with the extention is that it used Blender's built in render animation command which does not wait for the files to be loaded before attempting to render. \n\nMy solution to the problem
    was to build my own animation rendering function and use that. I still used the Stop-Motion-OBJ extention and just added my custom function to it. This function would manually go through each file in the stream, ensure it has been fully loaded, then render it, save it and 
    move onto the next file.\n\nThis project taught me so much about working with code I did not write. I had to read through and understand how the extention worked in order to see the problem and come up with a solution.`,
    techStack: ['Python', 'Blender'],
    tags: ['Blender', 'Simulations', 'Research'],
    demoUrl: 'https://fluidgroup.org/',
    image: '/images/simvis.png', 
    featured: true,
  },
  {
    slug: 'building-website',
    title: 'Building with AI',
    description: 'Testing Claude programming abilities while building personal website.',
    longDescription: `With all of hipe about Ai replacing programmers, I wanted test how good it was at basic web development. I used the free version of Claude (Sonnet 4.6) and had it generate the entire website with one prompt. I went back and forth with chatgpt to develop this prompt and then just fed it to Claude. It gave me the code seperated by files and I just had to create each file copy and paste. \n\n
    Result:\n\n The code looks pretty good, there a couple random errors but they were easy to fix. There was a missing <a> tag and the tsconfig file was for the wrong version of Astro. These were fairly easy fixes and the project ran locally perfectly after these bugs were fixed. \nAny changes I wanted to make to the website I did manually and it was fairly easy. Even hosting on github it was able to help me do without too much issue. \n\n
    Conclusion:\n\n I think it did pretty well and sped up the development process quite a bit. I do not know how helpful this would be to non-tech people. I was able to read errors and understand the code to be able to fix the little mistakes. The next thing I want to test is if Cluade and fix its own code without making a mess of it, and if it can make large changes to the website without breaking it.\n\nI also learned a bit about how Astro works just by reading over the code.
    The most important thing I learned was in using a domain name and using GitHub actions in order to host the website.\n\nOverall interesting project and I will keep the website for now.`,
    techStack: ['Astro', 'Tailwind', 'TypeScript', 'Claude'],
    tags: ['website', 'ai'],
    githubUrl: 'https://github.com/CalebHellmund/calebhellmund.github.io',
    demoUrl: 'https://Calebhellmund.com/',
    image: '/images/webdemo.png', 
    featured: false,
  },
  {
    slug: 'building-rover',
    title: 'Building Rover OS with ROS2',
    description: 'Developing the OS for our rover from the ground up',
    longDescription: `This project has been so much fun. The team is building a rover in order to compete in the NASA hosted Lunarbotics competition. I am building the OS system for the rover from the ground up. I am using ROS2 Humble, which runs on top of Ubuntu 22.4. All the nodes are written in Python and the program will run both on the rover and on a computer we use for controlling it. 
    \n\nOn the control side, we have an Xbox controller sending information to the control computer which in tern processes the information and sends commands to the computer on the rover (a Jetson).
    \n\nOn the Jetson, the commands are processed and the relevant information is sent to the various motors on the rover. If time permits, we will also set up autonomy on the rover, allowing it to navigate the course without human input but based just on the sensors and cameras on the rover.
    \n\nCheck out my posts and our LinkedIn (live demo) for more information for the process and updates.`,
    techStack: ['ROS2', 'Python'],
    tags: ['Python', 'ROS2', 'Robotics'],
    demoUrl: 'https://www.linkedin.com/company/liberty-vanguard-robotics/',
    image: '/images/rover.jpg', 
    featured: true,
  },
    {
    slug: 'clipboard-manager',
    title: 'Light-weight Clipboard Manager',
    description: 'A lightweight clipboard history tool for Windows',
    longDescription: `I built this manager after taking Algorithms and Data Structures. Part of the purpose was to practice building my own data structure. I built a Circular Buffer in order to keep the past ten text copies in memory. The other part was to learn a bit about how build a windows app and how to interact with the keys and windows clipboard. 
    \n\nIt works by constantly checking if the copy keys have been pressed. If they have, then the program adds the copied text to the buffer. If the custom paste keys have been pressed (Ctrl+Shift+NUM), the program grabs the correct text from the buffer, copies it to the clipboard and then calls the paste function.
    \n\nThis was a fun little project, check it out on GitHub!`,
    techStack: ['C++'],
    tags: ['C++', 'Data Structures', 'Window apps'],
    githubUrl: 'https://github.com/CalebHellmund/ClipboardManager',
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}