import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export function generateShoppingList(recipeData) {
  if (recipeData.length === 0) {
    toast.error("No recipe found");
    return;
  }

  let pdfData = [];

  for (let recipe in recipeData) {
    let ingredients = recipeData[recipe].extendedIngredients;
    let tempData = {
      recipeName: recipeData[recipe].title,
      ingredient: {},
    };

    for (let ingredient in ingredients) {
      let aisle = ingredients[ingredient].aisle;
      if (!tempData.ingredient.hasOwnProperty(aisle)) {
        tempData.ingredient[aisle] = [];
      }
      tempData.ingredient[aisle].push(ingredients[ingredient].original);
    }

    pdfData.push(tempData);
  }

  generateShoppingListPDF(pdfData);
}

export async function generateShoppingListPDF(recipes) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const PAGE_WIDTH = 595;
  const PAGE_HEIGHT = 842;
  const MARGIN_X = 50;
  const MAX_TEXT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

  for (const recipe of recipes) {
    let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - 60;

    /* =====================
       RECIPE TITLE
    ===================== */
    const titleLines = wrapText(recipe.recipeName, font, 18, MAX_TEXT_WIDTH);

    for (const line of titleLines) {
      page.drawText(line, {
        x: MARGIN_X,
        y,
        size: 18,
        font,
      });
      y -= 24;
    }

    y -= 10;

    page.drawLine({
      start: { x: MARGIN_X, y },
      end: { x: PAGE_WIDTH - MARGIN_X, y },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });

    y -= 25;

    /* =====================
       INGREDIENTS
    ===================== */
    for (const [category, items] of Object.entries(recipe.ingredient)) {
      // Category heading
      page.drawText(category.toUpperCase(), {
        x: MARGIN_X,
        y,
        size: 13,
        font,
      });

      y -= 18;

      for (const item of items) {
        const itemLines = wrapText(`[ ] ${item}`, font, 11, MAX_TEXT_WIDTH - 20);

        for (const line of itemLines) {
          page.drawText(line, {
            x: MARGIN_X + 20,
            y,
            size: 11,
            font,
          });
          y -= 14;
        }
      }

      y -= 12;
    }
  }

  /* =====================
     DOWNLOAD
  ===================== */
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "shopping-list.pdf";
  link.click();
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, size);

    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}
