// this JavaScript code is used to create a dynamic menu that can be toggled on and off
// The menu is designed to be responsive and adapt to different screen sizes
// The menu items are created dynamically based on a data structure that can be modified
// The menu items can have submenus, and the submenu items can also have their own submenus 
// The menu is styled using Tailwind CSS classes for a modern and clean look
// The menu is designed to be accessible and user-friendly, with clear navigation and hover effects
document.addEventListener('DOMContentLoaded', () => {
    const dynamicMenuContainer = document.getElementById('dynamic-menu-container');
    const toggleDynamicMenuButton = document.getElementById('toggle-dynamic-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const staticNav = document.getElementById('static-nav'); // Get the static navigation element

    // Sample dynamic menu data (can be fetched from an API)
    // This data structure can be modified to include more levels of submenus
    // or different properties as needed.
    // Each menu item can have a label, link, and optional submenu array.
    // The submenu array can contain items with the same structure as the main menu items.
    // Example: A menu item with a submenu containing another level of submenus
    // is also supported.
    // The submenu items can also have their own submenus, allowing for multi-level menus.
    // This example includes a few levels of submenus to demonstrate the functionality.
    const menuData = [
        {
            label: 'Home', // Main menu item
            link: '#home' // Example of a simple link   
        },
        {
            label: 'Products',
            link: '#products',
            submenu: [
                { label: 'Electronics', link: '#electronics' },
                { label: 'Clothing', link: '#clothing' },
                {
                    label: 'Books',
                    link: '#books',
                    submenu: [
                        { label: 'Fiction', link: '#fiction' },
                        { label: 'Non-Fiction', link: '#non-fiction' },
                    ],
                },
            ],
        },
        {
            label: 'Services',
            link: '#services',
            submenu: [
                { label: 'Web Design', link: '#web-design' },
                { label: 'Development', link: '#development' },
                { label: 'Consulting', link: '#consulting' },
            ],
        },
        {
            label: 'About Us',
            link: '#about'
        },
        {
            label: 'Contact',
            link: '#contact',
            onClick: () => {
                alert('Contact button clicked!'); // Example of custom action
            }
        },
    ];

    function createMenuItem(item) {
        const listItem = document.createElement('li');
        listItem.classList.add('dynamic-menu-item', 'relative'); 
        // 'relative' for submenu positioning
        // Add classes for styling and layout
        // You can customize the classes based on your design requirements
        // and the framework you are using (e.g., Tailwind CSS, Bootstrap, etc.)

        const link = document.createElement('a'); // Create a link element for the menu item
        link.href = item.link || '#'; // Use '#' as default link if none provided
        link.textContent = item.label; // Set the text content to the label of the menu item
        link.classList.add('block', 'py-2', 'px-4', 'text-gray-800', 'hover:bg-gray-200', 'transition', 'duration-200', 'ease-in-out');

        if (item.onClick) {
            link.addEventListener('click', item.onClick);
        }

        listItem.appendChild(link); // Append the link to the list item
        // Check if the item has a submenu
        // If it does, create a nested unordered list for the submenu items
        // and append it to the list item

        if (item.submenu) {
            listItem.classList.add('has-submenu');
            const submenuUl = document.createElement('ul');
            submenuUl.classList.add('dynamic-submenu', 'absolute', 'top-full', 'left-0', 'bg-white', 'shadow-md', 'rounded-md', 'z-10');
            item.submenu.forEach(subItem => {
                submenuUl.appendChild(createMenuItem(subItem));
            });
            listItem.appendChild(submenuUl);
        }

        return listItem;
    }

    // this function is used to render the menu items in a horizontal layout
    // using Tailwind CSS classes for styling and layout
    function renderMenu(data, container) {
        const menuUl = document.createElement('ul');
        menuUl.classList.add('md:flex', 'space-x-4'); // Tailwind classes for horizontal layout
        data.forEach(item => {
            menuUl.appendChild(createMenuItem(item));
        });
        container.appendChild(menuUl);
    }

    // this function is used to render the mobile menu items in a vertical layout
    // using Tailwind CSS classes for styling and layout
    // The mobile menu is hidden by default and can be toggled using a button
    // The mobile menu items are styled to be full-width and have a different hover effect
    // compared to the desktop menu items
    // The submenu items in the mobile menu are indented to indicate their hierarchy
    // and are styled to be smaller in size compared to the main menu items
    // The mobile menu is designed to be responsive and adapt to different screen sizes
    function renderMobileMenu(data, container) {
        const menuUl = document.createElement('ul');
        data.forEach(item => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = item.link || '#';
            link.textContent = item.label;
            link.classList.add('block', 'py-3', 'px-6', 'text-white', 'hover:bg-indigo-700', 'transition', 'duration-200', 'ease-in-out');
            listItem.appendChild(link);

            if (item.submenu) {
                const submenuUl = document.createElement('ul');
                submenuUl.classList.add('ml-4');
                item.submenu.forEach(subItem => {
                    const subListItem = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.href = subItem.link || '#';
                    subLink.textContent = subItem.label;
                    subLink.classList.add('block', 'py-2', 'px-8', 'text-indigo-200', 'hover:bg-indigo-800', 'transition', 'duration-200', 'ease-in-out', 'text-sm');
                    subListItem.appendChild(subLink);
                    submenuUl.appendChild(subListItem);
                });
                listItem.appendChild(submenuUl);
            }
            menuUl.appendChild(listItem);
        });
        container.appendChild(menuUl);
    }

    // Render the dynamic menu (initially hidden on larger screens)
    // The dynamic menu is designed to be responsive and adapt to different screen sizes
    renderMenu(menuData, dynamicMenuContainer);
    dynamicMenuContainer.classList.add('hidden'); // Initially hide it

    // Render the mobile menu (initially hidden)
    renderMobileMenu(menuData, mobileMenu);
    mobileMenu.classList.add('hidden');

    // Toggle the dynamic menu visibility on larger screens AND the static navigation
    if (toggleDynamicMenuButton && dynamicMenuContainer && staticNav) {
        toggleDynamicMenuButton.addEventListener('click', () => {
            dynamicMenuContainer.classList.toggle('hidden');
            staticNav.classList.toggle('hidden');
        });
    }

    
    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});