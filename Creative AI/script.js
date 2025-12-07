import React, { useEffect, useRef, useState } from 'react';

export default function SpanishGame() {
  const sketchRef = useRef();
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.p5((p) => {
        let screen = 'home';
        let currentSection = '';
        let questionIndex = 0;
        let score = 0;
        let selectedAnswer = -1;
        let answered = false;
        
        // Ship and shooting mechanics
        let shipX = 400;
        let shipY = 680;
        let shipSpeed = 8;
        let bullets = [];
        let bulletSpeed = 10;
        let answerBoxes = [];

        const vocabularyQuestions = [
          { q: 'What does "gato" mean?', a: ['Cat', 'Dog', 'Bird', 'Fish'], correct: 0 },
          { q: 'What does "casa" mean?', a: ['Car', 'House', 'Tree', 'Book'], correct: 1 },
          { q: 'What does "agua" mean?', a: ['Fire', 'Water', 'Earth', 'Air'], correct: 1 },
          { q: 'What does "libro" mean?', a: ['Table', 'Chair', 'Book', 'Pen'], correct: 2 },
          { q: 'What does "rojo" mean?', a: ['Blue', 'Green', 'Red', 'Yellow'], correct: 2 },
          { q: 'What does "mesa" mean?', a: ['Table', 'Bed', 'Door', 'Window'], correct: 0 },
          { q: 'What does "perro" mean?', a: ['Cat', 'Dog', 'Mouse', 'Rabbit'], correct: 1 },
          { q: 'What does "grande" mean?', a: ['Small', 'Big', 'Tall', 'Short'], correct: 1 },
          { q: 'What does "noche" mean?', a: ['Day', 'Morning', 'Night', 'Afternoon'], correct: 2 },
          { q: 'What does "amigo" mean?', a: ['Enemy', 'Friend', 'Family', 'Stranger'], correct: 1 }
        ];

        const verbQuestions = [
          { q: 'Conjugate: Yo _____ (hablar)', a: ['hablo', 'hablas', 'habla', 'hablan'], correct: 0 },
          { q: 'Conjugate: Tú _____ (comer)', a: ['como', 'comes', 'come', 'comen'], correct: 1 },
          { q: 'Conjugate: Él _____ (vivir)', a: ['vivo', 'vives', 'vive', 'viven'], correct: 2 },
          { q: 'Conjugate: Nosotros _____ (estudiar)', a: ['estudio', 'estudias', 'estudiamos', 'estudian'], correct: 2 },
          { q: 'Conjugate: Ellos _____ (correr)', a: ['corro', 'corres', 'corre', 'corren'], correct: 3 },
          { q: 'Conjugate: Yo _____ (ser)', a: ['soy', 'eres', 'es', 'son'], correct: 0 },
          { q: 'Conjugate: Tú _____ (tener)', a: ['tengo', 'tienes', 'tiene', 'tienen'], correct: 1 },
          { q: 'Conjugate: Ella _____ (ir)', a: ['voy', 'vas', 'va', 'van'], correct: 2 },
          { q: 'Conjugate: Nosotros _____ (hacer)', a: ['hago', 'haces', 'hacemos', 'hacen'], correct: 2 },
          { q: 'Conjugate: Ustedes _____ (poder)', a: ['puedo', 'puedes', 'puede', 'pueden'], correct: 3 }
        ];

        const sentenceQuestions = [
          { q: 'Translate: The cat is big', a: ['El gato es grande', 'La gato es grande', 'El gato está grande', 'La gata son grande'], correct: 0 },
          { q: 'Translate: I have a book', a: ['Yo tiene un libro', 'Yo tengo un libro', 'Yo tener un libro', 'Yo tiene uno libro'], correct: 1 },
          { q: 'Translate: She eats an apple', a: ['Ella come una manzana', 'Ella comer una manzana', 'Ella comes una manzana', 'Ella comemos una manzana'], correct: 0 },
          { q: 'Translate: We are students', a: ['Nosotros es estudiantes', 'Nosotros está estudiantes', 'Nosotros somos estudiantes', 'Nosotros son estudiantes'], correct: 2 },
          { q: 'Translate: They live in a house', a: ['Ellos vive en una casa', 'Ellos vives en una casa', 'Ellos vivimos en una casa', 'Ellos viven en una casa'], correct: 3 },
          { q: 'Translate: My friend is happy', a: ['Mi amigo es feliz', 'Mi amigo está feliz', 'Mis amigo es feliz', 'Mi amigo son feliz'], correct: 1 },
          { q: 'Translate: The house is white', a: ['La casa es blanco', 'El casa es blanca', 'La casa es blanca', 'Las casa es blanca'], correct: 2 },
          { q: 'Translate: I want water', a: ['Yo quiero agua', 'Yo quiere agua', 'Yo querer agua', 'Yo quieres agua'], correct: 0 },
          { q: 'Translate: You speak Spanish', a: ['Tú hablo español', 'Tú habla español', 'Tú hablas español', 'Tú hablan español'], correct: 2 },
          { q: 'Translate: We go to school', a: ['Nosotros va a la escuela', 'Nosotros vamos a la escuela', 'Nosotros van a la escuela', 'Nosotros vas a la escuela'], correct: 1 }
        ];

        const animalQuestions = [
          { q: 'What is this animal?', animal: '🐕', a: ['El gato', 'El perro', 'El pájaro', 'El pez'], correct: 1 },
          { q: 'What is this animal?', animal: '🐊', a: ['El cocodrilo', 'El tigre', 'El león', 'El oso'], correct: 0 },
          { q: 'What is this animal?', animal: '🐘', a: ['El caballo', 'La jirafa', 'El elefante', 'El rinoceronte'], correct: 2 },
          { q: 'What is this animal?', animal: '🦁', a: ['El tigre', 'El león', 'El leopardo', 'El gato'], correct: 1 },
          { q: 'What is this animal?', animal: '🐱', a: ['El gato', 'El perro', 'El ratón', 'El conejo'], correct: 0 },
          { q: 'What is this animal?', animal: '🐯', a: ['El león', 'El tigre', 'El leopardo', 'El gato'], correct: 1 },
          { q: 'What is this animal?', animal: '🐻', a: ['El lobo', 'El oso', 'El perro', 'El zorro'], correct: 1 },
          { q: 'What is this animal?', animal: '🦒', a: ['El elefante', 'El caballo', 'La jirafa', 'La cebra'], correct: 2 },
          { q: 'What is this animal?', animal: '🐵', a: ['El mono', 'El gorila', 'El chimpancé', 'El orangután'], correct: 0 },
          { q: 'What is this animal?', animal: '🐧', a: ['El pato', 'El ganso', 'El pingüino', 'El cisne'], correct: 2 }
        ];

        const numberQuestions = [
          { q: 'What number is this?', animal: '1️⃣', a: ['Uno', 'Dos', 'Tres', 'Cuatro'], correct: 0 },
          { q: 'What number is this?', animal: '5️⃣', a: ['Tres', 'Cuatro', 'Cinco', 'Seis'], correct: 2 },
          { q: 'How do you say "ten"?', a: ['Ocho', 'Nueve', 'Diez', 'Once'], correct: 2 },
          { q: 'How do you say "seven"?', a: ['Cinco', 'Seis', 'Siete', 'Ocho'], correct: 2 },
          { q: 'What is "veinte"?', a: ['Ten', 'Fifteen', 'Twenty', 'Twenty-five'], correct: 2 },
          { q: 'How do you say "fifteen"?', a: ['Catorce', 'Quince', 'Dieciséis', 'Diecisiete'], correct: 1 },
          { q: 'What is "cien"?', a: ['Ten', 'Fifty', 'One hundred', 'One thousand'], correct: 2 },
          { q: 'How do you say "thirty"?', a: ['Veinte', 'Treinta', 'Cuarenta', 'Cincuenta'], correct: 1 },
          { q: 'What number is "ochenta"?', a: ['Sixty', 'Seventy', 'Eighty', 'Ninety'], correct: 2 },
          { q: 'How do you say "twelve"?', a: ['Once', 'Doce', 'Trece', 'Catorce'], correct: 1 }
        ];

        const colorQuestions = [
          { q: 'What color is this?', animal: '🔴', a: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 1 },
          { q: 'What color is this?', animal: '🔵', a: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 0 },
          { q: 'What color is this?', animal: '🟢', a: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 2 },
          { q: 'What color is this?', animal: '🟡', a: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 3 },
          { q: 'How do you say "black"?', a: ['Blanco', 'Negro', 'Gris', 'Marrón'], correct: 1 },
          { q: 'How do you say "white"?', a: ['Blanco', 'Negro', 'Gris', 'Marrón'], correct: 0 },
          { q: 'What is "morado"?', a: ['Orange', 'Purple', 'Pink', 'Brown'], correct: 1 },
          { q: 'What is "naranja"?', a: ['Orange', 'Purple', 'Pink', 'Brown'], correct: 0 },
          { q: 'How do you say "pink"?', a: ['Rojo', 'Rosa', 'Morado', 'Naranja'], correct: 1 },
          { q: 'What is "café/marrón"?', a: ['Gray', 'Brown', 'Beige', 'Tan'], correct: 1 }
        ];

        const foodQuestions = [
          { q: 'What is this?', animal: '🍎', a: ['La naranja', 'La manzana', 'La pera', 'El plátano'], correct: 1 },
          { q: 'What is this?', animal: '🍕', a: ['La hamburguesa', 'El taco', 'La pizza', 'El sándwich'], correct: 2 },
          { q: 'What is this?', animal: '🥛', a: ['El agua', 'El jugo', 'La leche', 'El café'], correct: 2 },
          { q: 'How do you say "bread"?', a: ['El pan', 'El arroz', 'La pasta', 'El cereal'], correct: 0 },
          { q: 'What is "pollo"?', a: ['Beef', 'Chicken', 'Pork', 'Fish'], correct: 1 },
          { q: 'How do you say "water"?', a: ['El agua', 'La leche', 'El jugo', 'El té'], correct: 0 },
          { q: 'What is "queso"?', a: ['Butter', 'Cheese', 'Milk', 'Cream'], correct: 1 },
          { q: 'How do you say "egg"?', a: ['El huevo', 'La carne', 'El pescado', 'El pollo'], correct: 0 },
          { q: 'What is "verduras"?', a: ['Fruits', 'Vegetables', 'Meats', 'Grains'], correct: 1 },
          { q: 'How do you say "rice"?', a: ['El pan', 'La pasta', 'El arroz', 'Las papas'], correct: 2 }
        ];

        const familyQuestions = [
          { q: 'How do you say "mother"?', a: ['La madre', 'El padre', 'La hermana', 'El hermano'], correct: 0 },
          { q: 'How do you say "father"?', a: ['La madre', 'El padre', 'El abuelo', 'El tío'], correct: 1 },
          { q: 'What is "hermano"?', a: ['Cousin', 'Uncle', 'Brother', 'Father'], correct: 2 },
          { q: 'What is "hermana"?', a: ['Sister', 'Mother', 'Aunt', 'Cousin'], correct: 0 },
          { q: 'How do you say "grandmother"?', a: ['La madre', 'La tía', 'La abuela', 'La prima'], correct: 2 },
          { q: 'How do you say "grandfather"?', a: ['El padre', 'El tío', 'El abuelo', 'El primo'], correct: 2 },
          { q: 'What is "hijo"?', a: ['Son', 'Daughter', 'Father', 'Mother'], correct: 0 },
          { q: 'What is "hija"?', a: ['Son', 'Daughter', 'Sister', 'Brother'], correct: 1 },
          { q: 'How do you say "uncle"?', a: ['El tío', 'El primo', 'El abuelo', 'El padre'], correct: 0 },
          { q: 'What is "prima"?', a: ['Aunt', 'Female cousin', 'Sister', 'Niece'], correct: 1 }
        ];

        const phraseQuestions = [
          { q: 'How do you say "Hello"?', a: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 1 },
          { q: 'How do you say "Thank you"?', a: ['De nada', 'Por favor', 'Gracias', 'Lo siento'], correct: 2 },
          { q: 'What does "Por favor" mean?', a: ['Thank you', 'Please', 'Sorry', 'Excuse me'], correct: 1 },
          { q: 'How do you say "Goodbye"?', a: ['Hola', 'Adiós', 'Hasta luego', 'Buenos días'], correct: 1 },
          { q: 'What does "De nada" mean?', a: ['Thank you', 'Please', "You're welcome", 'Sorry'], correct: 2 },
          { q: 'How do you say "Good morning"?', a: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'], correct: 0 },
          { q: 'What does "Lo siento" mean?', a: ['Excuse me', "I'm sorry", 'Thank you', 'Please'], correct: 1 },
          { q: 'How do you say "How are you?"?', a: ['¿Qué tal?', '¿Cómo estás?', '¿Cómo te llamas?', '¿Qué pasa?'], correct: 1 },
          { q: 'What does "Me llamo..." mean?', a: ['I am...', 'My name is...', 'I like...', 'I want...'], correct: 1 },
          { q: 'How do you say "See you later"?', a: ['Adiós', 'Hasta mañana', 'Hasta luego', 'Nos vemos'], correct: 2 }
        ];

        const adjectiveQuestions = [
          { q: 'What does "grande" mean?', a: ['Small', 'Big', 'Tall', 'Short'], correct: 1 },
          { q: 'What does "pequeño" mean?', a: ['Big', 'Small', 'Medium', 'Tiny'], correct: 1 },
          { q: 'How do you say "beautiful"?', a: ['Feo', 'Bonito', 'Hermoso', 'Lindo'], correct: 2 },
          { q: 'What does "feliz" mean?', a: ['Sad', 'Angry', 'Happy', 'Tired'], correct: 2 },
          { q: 'How do you say "cold"?', a: ['Caliente', 'Frío', 'Tibio', 'Helado'], correct: 1 },
          { q: 'What does "rápido" mean?', a: ['Slow', 'Fast', 'Quick', 'Hurry'], correct: 1 },
          { q: 'How do you say "new"?', a: ['Viejo', 'Nuevo', 'Antiguo', 'Moderno'], correct: 1 },
          { q: 'What does "difícil" mean?', a: ['Easy', 'Hard', 'Difficult', 'Simple'], correct: 2 },
          { q: 'How do you say "good"?', a: ['Malo', 'Bueno', 'Mejor', 'Peor'], correct: 1 },
          { q: 'What does "cansado" mean?', a: ['Hungry', 'Thirsty', 'Tired', 'Sleepy'], correct: 2 }
        ];

        let currentQuestions = [];

        p.setup = () => {
          p.createCanvas(800, 750);
          p.textAlign(p.CENTER, p.CENTER);
        };

        p.draw = () => {
          p.background(240);

          if (screen === 'home') {
            drawHome();
          } else if (screen === 'quiz') {
            // Handle ship movement
            if (p.keyIsDown(p.LEFT_ARROW)) {
              shipX -= shipSpeed;
            }
            if (p.keyIsDown(p.RIGHT_ARROW)) {
              shipX += shipSpeed;
            }
            // Keep ship on screen
            shipX = p.constrain(shipX, 30, p.width - 30);
            
            drawQuiz();
          } else if (screen === 'results') {
            drawResults();
          }
        };

        function drawHome() {
          // Spanish-themed gradient background
          for (let i = 0; i < p.height; i++) {
            let inter = p.map(i, 0, p.height, 0, 1);
            let c = p.lerpColor(p.color(255, 200, 50), p.color(220, 50, 50), inter);
            p.stroke(c);
            p.line(0, i, p.width, i);
          }
          
          // Decorative elements
          p.noStroke();
          
          // Sun in corner
          p.fill(255, 220, 100, 150);
          p.circle(750, 50, 80);
          p.fill(255, 240, 150, 100);
          p.circle(750, 50, 100);
          
          // Decorative tiles pattern
          p.fill(255, 255, 255, 30);
          for (let x = 0; x < p.width; x += 40) {
            for (let y = 0; y < p.height; y += 40) {
              if ((x + y) % 80 === 0) {
                p.rect(x, y, 20, 20, 3);
              }
            }
          }
          
          // Title with shadow
          p.fill(100, 30, 20);
          p.textSize(52);
          p.textStyle(p.BOLD);
          p.text('¡Aprende Español!', p.width / 2 + 3, 63);
          
          p.fill(255, 245, 220);
          p.text('¡Aprende Español!', p.width / 2, 60);
          
          p.textSize(24);
          p.fill(255, 255, 255);
          p.text('Learn Spanish', p.width / 2, 95);
          
          // Subtitle with decorative elements
          p.textSize(20);
          p.textStyle(p.NORMAL);
          p.fill(255, 255, 255, 230);
          p.text('★  Elige una sección  ★', p.width / 2, 140);

          // Section buttons with Spanish-themed styling
          // Row 1
          drawSpanishButton(50, 180, 230, 70, 'Vocabulario', 'Vocabulary', 100, 150, 255);
          drawSpanishButton(290, 180, 230, 70, 'Verbos', 'Verb Usage', 100, 200, 100);
          drawSpanishButton(530, 180, 230, 70, 'Oraciones', 'Sentences', 255, 150, 100);
          
          // Row 2
          drawSpanishButton(50, 260, 230, 70, 'Animales', 'Animals', 255, 200, 50);
          drawSpanishButton(290, 260, 230, 70, 'Números', 'Numbers', 200, 100, 200);
          drawSpanishButton(530, 260, 230, 70, 'Colores', 'Colors', 255, 100, 150);
          
          // Row 3
          drawSpanishButton(50, 340, 230, 70, 'Comida', 'Food & Drinks', 255, 180, 100);
          drawSpanishButton(290, 340, 230, 70, 'Familia', 'Family', 150, 200, 255);
          drawSpanishButton(530, 340, 230, 70, 'Frases', 'Phrases', 180, 255, 180);
          
          // Row 4
          drawSpanishButton(50, 420, 230, 70, 'Adjetivos', 'Adjectives', 255, 220, 150);
        }
        
        function drawSpanishButton(x, y, w, h, spanishLabel, englishLabel, r, g, b) {
          const hover = p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h;
          
          // Shadow
          p.noStroke();
          p.fill(0, 0, 0, 40);
          p.rect(x + 3, y + 3, w, h, 12);
          
          // Button with tile pattern
          p.fill(hover ? r * 0.9 : r, hover ? g * 0.9 : g, hover ? b * 0.9 : b);
          p.stroke(255, 255, 255, 150);
          p.strokeWeight(3);
          p.rect(x, y, w, h, 12);
          
          // Decorative border
          p.noFill();
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(1);
          p.rect(x + 8, y + 8, w - 16, h - 16, 8);
          
          // Spanish text (main)
          p.noStroke();
          p.fill(255, 255, 255);
          p.textSize(22);
          p.textStyle(p.BOLD);
          p.text(spanishLabel, x + w / 2, y + h / 2 - 8);
          
          // English text (subtitle)
          p.textSize(14);
          p.textStyle(p.NORMAL);
          p.fill(255, 255, 255, 200);
          p.text(englishLabel, x + w / 2, y + h / 2 + 12);
          p.textStyle(p.NORMAL);
        }

        function drawQuiz() {
          if (questionIndex >= currentQuestions.length) {
            screen = 'results';
            return;
          }

          const q = currentQuestions[questionIndex];

          // Space background
          p.background(10, 10, 30);
          
          // Stars
          p.fill(255);
          p.noStroke();
          for (let i = 0; i < 50; i++) {
            let x = (i * 163) % p.width;
            let y = (i * 197) % 600;
            p.circle(x, y, 2);
          }

          // Question number and score in top corners
          p.fill(255, 255, 100);
          p.textSize(18);
          p.textAlign(p.LEFT);
          p.text(`Question ${questionIndex + 1}/10`, 30, 30);
          p.textAlign(p.RIGHT);
          p.text(`Score: ${score}`, p.width - 30, 30);
          p.textAlign(p.CENTER);

          // Main flashcard for question
          p.fill(40, 40, 80);
          p.stroke(100, 150, 255);
          p.strokeWeight(3);
          const cardY = q.animal ? 60 : 80;
          const cardHeight = q.animal ? 200 : 120;
          p.rect(p.width / 2 - 350, cardY, 700, cardHeight, 15);
          
          // Question text
          p.noStroke();
          p.fill(255, 255, 200);
          p.textSize(24);
          p.textStyle(p.BOLD);
          p.text(q.q, p.width / 2, cardY + 35);
          p.textStyle(p.NORMAL);

          // Display animal emoji if it's an animal question
          if (q.animal) {
            p.textSize(100);
            p.text(q.animal, p.width / 2, cardY + 130);
          }

          // Answer boxes (targets to shoot) - now horizontal
          const startY = q.animal ? 300 : 240;
          answerBoxes = [];
          
          const boxW = 180;
          const boxH = 60;
          const spacing = 10;
          const totalWidth = (boxW * 4) + (spacing * 3);
          const startX = (p.width - totalWidth) / 2;
          
          for (let i = 0; i < q.a.length; i++) {
            const boxX = startX + (i * (boxW + spacing));
            const boxY = startY;
            
            answerBoxes.push({x: boxX, y: boxY, w: boxW, h: boxH, index: i});
            
            let fillCol = [40, 40, 80];
            let strokeCol = [100, 150, 255];
            let textCol = [200, 220, 255];
            
            if (answered) {
              if (i === q.correct) {
                fillCol = [50, 120, 50];
                strokeCol = [100, 255, 100];
                textCol = [150, 255, 150];
              } else if (i === selectedAnswer && i !== q.correct) {
                fillCol = [120, 40, 40];
                strokeCol = [255, 100, 100];
                textCol = [255, 150, 150];
              }
            }

            // Shadow effect
            p.noStroke();
            p.fill(0, 0, 0, 50);
            p.rect(boxX + 3, boxY + 3, boxW, boxH, 8);

            // Answer box
            p.stroke(strokeCol[0], strokeCol[1], strokeCol[2]);
            p.strokeWeight(2);
            p.fill(fillCol[0], fillCol[1], fillCol[2]);
            p.rect(boxX, boxY, boxW, boxH, 8);
            
            // Answer text - wrapped for longer text
            p.noStroke();
            p.fill(textCol[0], textCol[1], textCol[2]);
            p.textSize(16);
            
            // Simple text wrapping
            let words = q.a[i].split(' ');
            let line1 = '';
            let line2 = '';
            
            if (words.length > 2) {
              line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
              line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
              p.text(line1, boxX + boxW / 2, boxY + 22);
              p.text(line2, boxX + boxW / 2, boxY + 42);
            } else {
              p.text(q.a[i], boxX + boxW / 2, boxY + boxH / 2);
            }
          }

          // Draw bullets
          p.fill(255, 255, 0);
          p.noStroke();
          for (let i = bullets.length - 1; i >= 0; i--) {
            let bullet = bullets[i];
            bullet.y -= bulletSpeed;
            
            // Draw bullet
            p.push();
            p.translate(bullet.x, bullet.y);
            p.fill(255, 255, 100);
            p.triangle(0, -10, -3, 0, 3, 0);
            p.fill(255, 200, 50);
            p.triangle(0, -5, -2, 0, 2, 0);
            p.pop();
            
            // Check collision with answer boxes
            if (!answered) {
              for (let box of answerBoxes) {
                if (bullet.x > box.x && bullet.x < box.x + box.w &&
                    bullet.y > box.y && bullet.y < box.y + box.h) {
                  selectedAnswer = box.index;
                  answered = true;
                  if (box.index === currentQuestions[questionIndex].correct) {
                    score++;
                  }
                  bullets.splice(i, 1);
                  break;
                }
              }
            }
            
            // Remove bullets that go off screen
            if (bullet.y < 0) {
              bullets.splice(i, 1);
            }
          }

          // Draw ship (Galaga style)
          p.push();
          p.translate(shipX, shipY);
          
          // Ship body
          p.fill(100, 200, 255);
          p.noStroke();
          p.triangle(0, -20, -20, 10, 20, 10);
          
          // Ship cockpit
          p.fill(255, 255, 100);
          p.circle(0, -5, 8);
          
          // Ship wings
          p.fill(150, 150, 255);
          p.triangle(-20, 10, -30, 15, -15, 15);
          p.triangle(20, 10, 30, 15, 15, 15);
          
          // Engine glow
          p.fill(255, 150, 50, 150);
          p.circle(-10, 12, 6);
          p.circle(10, 12, 6);
          p.fill(255, 200, 100, 100);
          p.circle(-10, 14, 8);
          p.circle(10, 14, 8);
          
          p.pop();

          // Instructions
          if (!answered) {
            p.fill(255, 255, 200);
            p.textSize(16);
            p.text('Use ← → arrows to move, SPACE to shoot!', p.width / 2, 720);
          }

          // Next button
          if (answered) {
            p.fill(0, 0, 0, 30);
            p.noStroke();
            p.rect(p.width / 2 - 98, 703, 196, 38, 8);
            
            p.stroke(100, 255, 100);
            p.strokeWeight(3);
            p.fill(50, 150, 50);
            p.rect(p.width / 2 - 100, 700, 200, 35, 8);
            
            p.noStroke();
            p.fill(200, 255, 200);
            p.textSize(20);
            p.textStyle(p.BOLD);
            p.text('Next →', p.width / 2, 717);
            p.textStyle(p.NORMAL);
          }
        }

        function drawResults() {
          p.fill(50);
          p.textSize(48);
          p.text('Quiz Complete!', p.width / 2, 100);

          p.textSize(36);
          p.text(`Your Score: ${score}/10`, p.width / 2, 200);

          const percentage = (score / 10) * 100;
          p.textSize(24);
          let message = '';
          if (percentage >= 90) message = 'Excellent! ¡Excelente!';
          else if (percentage >= 70) message = 'Good job! ¡Buen trabajo!';
          else if (percentage >= 50) message = 'Keep practicing! ¡Sigue practicando!';
          else message = 'Try again! ¡Inténtalo de nuevo!';
          
          p.text(message, p.width / 2, 280);

          // Retake button
          drawButton(p.width / 2 - 150, 360, 300, 70, 'Retake Quiz', 100, 200, 255);
          
          // Home button
          drawButton(p.width / 2 - 150, 450, 300, 70, 'Home', 255, 150, 100);
        }

        function drawButton(x, y, w, h, label, r, g, b) {
          const hover = p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h;
          
          p.fill(hover ? r * 0.8 : r, hover ? g * 0.8 : g, hover ? b * 0.8 : b);
          p.rect(x, y, w, h, 10);
          
          p.fill(255);
          p.textSize(20);
          p.text(label, x + w / 2, y + h / 2);
        }

        p.mousePressed = () => {
          if (screen === 'home') {
            // Row 1
            if (p.mouseX > 50 && p.mouseX < 280 && p.mouseY > 180 && p.mouseY < 250) {
              startQuiz('vocabulary');
            } else if (p.mouseX > 290 && p.mouseX < 520 && p.mouseY > 180 && p.mouseY < 250) {
              startQuiz('verbs');
            } else if (p.mouseX > 530 && p.mouseX < 760 && p.mouseY > 180 && p.mouseY < 250) {
              startQuiz('sentences');
            }
            // Row 2
            else if (p.mouseX > 50 && p.mouseX < 280 && p.mouseY > 260 && p.mouseY < 330) {
              startQuiz('animals');
            } else if (p.mouseX > 290 && p.mouseX < 520 && p.mouseY > 260 && p.mouseY < 330) {
              startQuiz('numbers');
            } else if (p.mouseX > 530 && p.mouseX < 760 && p.mouseY > 260 && p.mouseY < 330) {
              startQuiz('colors');
            }
            // Row 3
            else if (p.mouseX > 50 && p.mouseX < 280 && p.mouseY > 340 && p.mouseY < 410) {
              startQuiz('food');
            } else if (p.mouseX > 290 && p.mouseX < 520 && p.mouseY > 340 && p.mouseY < 410) {
              startQuiz('family');
            } else if (p.mouseX > 530 && p.mouseX < 760 && p.mouseY > 340 && p.mouseY < 410) {
              startQuiz('phrases');
            }
            // Row 4
            else if (p.mouseX > 50 && p.mouseX < 280 && p.mouseY > 420 && p.mouseY < 490) {
              startQuiz('adjectives');
            }
          } else if (screen === 'quiz' && answered) {
            // Next button
            if (p.mouseX > p.width / 2 - 100 && p.mouseX < p.width / 2 + 100 &&
                p.mouseY > 700 && p.mouseY < 735) {
              questionIndex++;
              selectedAnswer = -1;
              answered = false;
              bullets = [];
              shipX = 400;
            }
          } else if (screen === 'results') {
            // Retake button
            if (p.mouseX > p.width / 2 - 150 && p.mouseX < p.width / 2 + 150 &&
                p.mouseY > 360 && p.mouseY < 430) {
              startQuiz(currentSection);
            }
            // Home button
            else if (p.mouseX > p.width / 2 - 150 && p.mouseX < p.width / 2 + 150 &&
                     p.mouseY > 450 && p.mouseY < 520) {
              screen = 'home';
              currentSection = '';
            }
          }
        };

        p.keyPressed = () => {
          if (screen === 'quiz' && !answered) {
            // Shoot with spacebar
            if (p.key === ' ') {
              bullets.push({x: shipX, y: shipY - 20});
            }
          }
        };

        p.keyReleased = () => {
          // Movement handled in draw loop for smoother control
        };

        function startQuiz(section) {
          currentSection = section;
          screen = 'quiz';
          questionIndex = 0;
          score = 0;
          selectedAnswer = -1;
          answered = false;
          bullets = [];
          shipX = 400;
          shipY = 680;

          if (section === 'vocabulary') {
            currentQuestions = vocabularyQuestions;
          } else if (section === 'verbs') {
            currentQuestions = verbQuestions;
          } else if (section === 'sentences') {
            currentQuestions = sentenceQuestions;
          } else if (section === 'animals') {
            currentQuestions = animalQuestions;
          } else if (section === 'numbers') {
            currentQuestions = numberQuestions;
          } else if (section === 'colors') {
            currentQuestions = colorQuestions;
          } else if (section === 'food') {
            currentQuestions = foodQuestions;
          } else if (section === 'family') {
            currentQuestions = familyQuestions;
          } else if (section === 'phrases') {
            currentQuestions = phraseQuestions;
          } else if (section === 'adjectives') {
            currentQuestions = adjectiveQuestions;
          }
        }
      }, sketchRef.current);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={sketchRef} className="w-full h-full flex items-center justify-center bg-gray-100" />;
}