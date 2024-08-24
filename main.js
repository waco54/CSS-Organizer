let outputBox = document.querySelector("#cssOutput");
outputBox.style.display = "none";

const cssOrder = [
    'display', 'flex-direction', 'align-items', 'justify-content', 'position', 'top', 'right', 'bottom', 'left',
    'float', 'clear', 'visibility', 'opacity', 'z-index',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'outline', 'border', 'border-radius', 'border-top', 'border-right', 'border-bottom', 'border-left',
    'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
    'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'background', 'background-color', 'background-image', 'background-repeat', 'background-position',
    'cursor', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
    'overflow', 'list-style', 'caption-side', 'table-layout', 'border-collapse', 'border-spacing', 'empty-cells',
    'vertical-align', 'text-align', 'text-indent', 'text-transform', 'text-decoration', 'line-height',
    'word-spacing', 'letter-spacing', 'white-space', 'color', 'font', 'font-family', 'font-size', 'font-weight', 'user-select',
    'content', 'quotes', 'transition'
];

function organize() {
    let inputCss = document.querySelector("#cssInput").value;

    // Split CSS by selector block
    const blocks = inputCss.split('}').filter(block => block.trim() !== '');
    
    let organizedCss = '';

    blocks.forEach(block => {
        // Split into selector and properties
        const [selectors, properties] = block.split('{').map(part => part.trim());

        // Parse CSS properties
        const cssRules = properties.split(';').filter(rule => rule.trim() !== '');
        let cssMap = new Map();
        cssRules.forEach(rule => {
            let [property, value] = rule.split(':').map(str => str.trim());
            if (property && value) {
                cssMap.set(property, value);
            }
        });

        // Sort properties
        let sortedProperties = [];
        cssOrder.forEach(property => {
            if (cssMap.has(property)) {
                sortedProperties.push(`    ${property}: ${cssMap.get(property)}`);
            }
        });

        // Append to organized CSS with proper formatting
        organizedCss += `${selectors} {\n${sortedProperties.join(';\n')};\n}\n\n`;
    });

    // Output sorted CSS
    console.log(organizedCss.trim());
    outputBox.innerText = organizedCss.trim();
    outputBox.style.display = "block";
}
