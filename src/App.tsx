import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TILE_SIZE = 32;

// 0: Floor, 1: Wall, 2: Pillar, 3: Barrel, 4: Chest, 5: Altar, 6: Stairs, 7: Rock
const mapData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,2,0,0,0,0,2,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,5,5,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,2,0,0,0,0,2,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,3,2,0,0,2,3,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,3,2,0,0,2,3,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,3,2,0,0,2,3,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,3,2,0,0,2,3,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,4,0,0,4,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,7,7,0,0,0,0,0,0,7,7,1,1,1,1,1],
  [1,1,1,1,1,7,0,0,0,0,0,0,0,0,7,1,1,1,1,1],
  [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const MAP_WIDTH = mapData[0].length * TILE_SIZE;
const MAP_HEIGHT = mapData.length * TILE_SIZE;

class StartScene extends Phaser.Scene {
  private selectedIndex = 0;
  private menuItems: Phaser.GameObjects.Text[] = [];
  private xKey!: Phaser.Input.Keyboard.Key;
  private cKey!: Phaser.Input.Keyboard.Key;
  private upKey!: Phaser.Input.Keyboard.Key;
  private downKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('StartScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

    this.add.text(width / 2, height / 3, 'DARK BLOOD', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '120px',
      fontStyle: 'bold',
      color: '#ff0000',
      stroke: '#ffffff',
      strokeThickness: 6
    }).setOrigin(0.5);

    const startText = this.add.text(width / 2, height / 2 + 50, 'START', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const exitText = this.add.text(width / 2, height / 2 + 150, 'EXIT', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.menuItems = [startText, exitText];

    this.add.text(width / 2, height - 100, 'Controls: Arrows to move, O to open Option Menu, X to confirm, C to close', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: '#aaaaaa',
      wordWrap: { width: width - 100, useAdvancedWrap: true },
      align: 'center'
    }).setOrigin(0.5);

    if (this.input.keyboard) {
      this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    this.updateSelection();
  }

  updateSelection() {
    this.menuItems.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.setColor('#ff0000');
        item.setText(`> ${item.text.replace('> ', '').replace(' <', '')} <`);
      } else {
        item.setColor('#ffffff');
        item.setText(item.text.replace('> ', '').replace(' <', ''));
      }
    });
  }

  update() {
    if (!this.input.keyboard) return;

    if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
      this.updateSelection();
    } else if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
      this.updateSelection();
    }

    if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
      if (this.selectedIndex === 0) {
        this.scene.start('GameScene');
      } else {
        // EXIT
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 150, 'Please close the tab to exit.', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#aaaaaa'
        }).setOrigin(0.5);
      }
    }
  }
}

class UIScene extends Phaser.Scene {
  private playerStats: any;
  private hpBar!: Phaser.GameObjects.Rectangle;
  private hpText!: Phaser.GameObjects.Text;
  private mpBar!: Phaser.GameObjects.Rectangle;
  private mpText!: Phaser.GameObjects.Text;
  private expBar!: Phaser.GameObjects.Rectangle;
  private expText!: Phaser.GameObjects.Text;
  private lvlText!: Phaser.GameObjects.Text;
  private optionMenuContainer!: Phaser.GameObjects.Container;
  private optionMenuTweens: Phaser.Tweens.Tween[] = [];
  private subMenuContainer!: Phaser.GameObjects.Container;

  constructor() {
    super('UIScene');
  }

  create() {
    this.playerStats = this.registry.get('playerStats');

    const panelX = 20;
    const panelY = 20;
    const panelW = 450;
    const panelH = 180;

    const uiBg = this.add.graphics();
    uiBg.setDepth(15);
    // Gradient-like background
    uiBg.fillStyle(0x131313, 0.8);
    uiBg.fillRect(panelX, panelY, panelW, panelH);
    uiBg.lineStyle(1, 0x5a403c, 0.3);
    uiBg.strokeRect(panelX, panelY, panelW, panelH);

    // Filigree
    uiBg.lineStyle(2, 0xaf8d11, 0.4);
    // TL
    uiBg.beginPath();
    uiBg.moveTo(panelX, panelY + 20); uiBg.lineTo(panelX, panelY); uiBg.lineTo(panelX + 20, panelY);
    uiBg.strokePath();
    // BR
    uiBg.beginPath();
    uiBg.moveTo(panelX + panelW - 20, panelY + panelH); uiBg.lineTo(panelX + panelW, panelY + panelH); uiBg.lineTo(panelX + panelW, panelY + panelH - 20);
    uiBg.strokePath();

    // Portrait
    const portraitSize = 100;
    const portraitX = panelX + 20;
    const portraitY = panelY + 20;
    this.add.rectangle(portraitX, portraitY, portraitSize, portraitSize, 0x0e0e0e).setOrigin(0).setDepth(15).setStrokeStyle(2, 0xe9c349, 0.4);
    this.add.image(portraitX + 5, portraitY + 5, 'portrait').setDisplaySize(portraitSize - 10, portraitSize - 10).setOrigin(0).setDepth(15);

    // Level Badge
    const badgeX = portraitX + portraitSize - 10;
    const badgeY = portraitY + portraitSize - 10;
    this.add.rectangle(badgeX, badgeY, 60, 25, 0x353534).setOrigin(0).setDepth(16).setStrokeStyle(1, 0xe9c349, 1);
    this.lvlText = this.add.text(badgeX + 30, badgeY + 12, `LVL ${this.playerStats.level}`, {
      fontFamily: 'Newsreader, serif', fontSize: '12px', fontStyle: 'bold', color: '#e9c349'
    }).setOrigin(0.5).setDepth(16).setLetterSpacing(2);

    // Name
    this.add.text(portraitX + portraitSize + 20, portraitY, this.playerStats.name.toUpperCase(), {
      fontFamily: 'Newsreader, serif', fontSize: '32px', fontStyle: 'bold', color: '#e5e2e1'
    }).setDepth(15).setLetterSpacing(-2);

    // Bars
    const barStartX = portraitX + portraitSize + 20;
    const barWidth = 200;

    // HP
    this.add.text(barStartX, portraitY + 45, 'VITALITY', { fontFamily: 'Newsreader, serif', fontSize: '10px', fontStyle: 'bold', color: '#e3beb8' }).setDepth(15).setLetterSpacing(2);
    this.hpText = this.add.text(barStartX + barWidth, portraitY + 45, `${this.playerStats.hp} / ${this.playerStats.maxHp}`, { fontFamily: 'Newsreader, serif', fontSize: '10px', fontStyle: 'bold', color: '#ffb4a8' }).setOrigin(1, 0).setDepth(15);
    this.add.rectangle(barStartX, portraitY + 60, barWidth, 16, 0x0e0e0e).setOrigin(0).setDepth(15).setStrokeStyle(1, 0x5a403c, 0.2);
    this.hpBar = this.add.rectangle(barStartX, portraitY + 60, barWidth * (this.playerStats.hp / this.playerStats.maxHp), 16, 0x8b0000).setOrigin(0).setDepth(15);
    // HP Glint
    const hpGlint = this.add.graphics();
    hpGlint.setDepth(16);
    hpGlint.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.15, 0.15, 0, 0);
    hpGlint.fillRect(barStartX, portraitY + 60, barWidth, 8);

    // MP
    this.add.text(barStartX, portraitY + 85, 'ESSENCE', { fontFamily: 'Newsreader, serif', fontSize: '10px', fontStyle: 'bold', color: '#e3beb8' }).setDepth(15).setLetterSpacing(2);
    this.mpText = this.add.text(barStartX + barWidth, portraitY + 85, `${this.playerStats.mp} / ${this.playerStats.maxMp}`, { fontFamily: 'Newsreader, serif', fontSize: '10px', fontStyle: 'bold', color: '#60a5fa' }).setOrigin(1, 0).setDepth(15);
    this.add.rectangle(barStartX, portraitY + 100, barWidth, 12, 0x0e0e0e).setOrigin(0).setDepth(15).setStrokeStyle(1, 0x5a403c, 0.2);
    this.mpBar = this.add.rectangle(barStartX, portraitY + 100, barWidth * (this.playerStats.mp / this.playerStats.maxMp), 12, 0x1e3a8a).setOrigin(0).setDepth(15);

    // EXP
    this.add.rectangle(barStartX, portraitY + 125, barWidth, 6, 0x0e0e0e).setOrigin(0).setDepth(15).setStrokeStyle(1, 0x5a403c, 0.1);
    this.expBar = this.add.rectangle(barStartX, portraitY + 125, barWidth * (this.playerStats.exp / this.playerStats.expToNext), 6, 0xaf8d11).setOrigin(0).setDepth(15);
    this.expText = this.add.text(barStartX + barWidth, portraitY + 135, `SOUL PROGRESS: ${Math.floor((this.playerStats.exp / this.playerStats.expToNext) * 100)}%`, {
      fontFamily: 'Newsreader, serif', fontSize: '8px', color: '#574500'
    }).setOrigin(1, 0).setDepth(15).setLetterSpacing(2);

    this.registry.events.on('changedata', this.updateUI, this);
    
    // Initial update
    this.updateUI(null, 'playerStats', this.playerStats);
  }

  showOptionMenu(selectedIndex: number) {
    this.hideOptionMenu();
    this.optionMenuContainer = this.add.container(0, 0);
    this.optionMenuContainer.setDepth(100);
    
    const width = this.cameras.main.width;
    
    // Background on the right side
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.9);
    bg.lineStyle(2, 0xffffff, 1);
    bg.fillRect(width - 280, 60, 250, 250);
    bg.strokeRect(width - 280, 60, 250, 250);
    this.optionMenuContainer.add(bg);
    
    this.updateOptionMenu(selectedIndex);
  }

  updateOptionMenu(selectedIndex: number) {
    if (!this.optionMenuContainer) return;
    
    // Clear previous items but keep background (which is at index 0)
    while (this.optionMenuContainer.length > 1) {
        this.optionMenuContainer.removeAt(1, true);
    }
    
    this.optionMenuTweens.forEach(t => t.stop());
    this.optionMenuTweens = [];

    const width = this.cameras.main.width;
    const items = ['PROFILE', 'BAG', 'MAP'];
    
    items.forEach((item, index) => {
        const isSelected = index === selectedIndex;
        
        if (isSelected) {
            const highlight = this.add.graphics();
            highlight.fillStyle(0x333333, 1);
            highlight.fillRect(width - 280, 80 + index * 60 - 10, 250, 50);
            this.optionMenuContainer.add(highlight);
        }

        const text = this.add.text(width - 250, 80 + index * 60, item, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '32px',
            fontStyle: isSelected ? 'bold' : 'normal',
            color: isSelected ? '#ffaa00' : '#ffffff'
        });
        
        if (isSelected) {
            const tween = this.tweens.add({
                targets: text,
                x: width - 240,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            this.optionMenuTweens.push(tween);
        }
        
        this.optionMenuContainer.add(text);
    });
  }

  confirmOptionMenu(selectedIndex: number, onComplete: () => void) {
      if (!this.optionMenuContainer) {
          onComplete();
          return;
      }
      
      // Find the selected text (it's the last added item for the selected index)
      // Actually, let's just flash the whole container or the specific item
      const items = this.optionMenuContainer.getAll();
      const selectedText = items[items.length - 1]; // Approximation, but let's just flash the container
      
      this.tweens.add({
          targets: this.optionMenuContainer,
          alpha: 0,
          duration: 150,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
              onComplete();
          }
      });
  }

  hideOptionMenu() {
    if (this.optionMenuContainer) {
        this.optionMenuTweens.forEach(t => t.stop());
        this.optionMenuTweens = [];
        this.optionMenuContainer.destroy();
    }
  }

  showSubMenu(type: string, data: any) {
    this.hideSubMenu();
    this.subMenuContainer = this.add.container(0, 0);
    this.subMenuContainer.setDepth(110);
    
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.95);
    bg.lineStyle(2, 0xffffff, 1);
    
    if (type === 'PROFILE') {
      bg.fillRect(60, 60, width - 120, height - 120);
      bg.strokeRect(60, 60, width - 120, height - 120);
      this.subMenuContainer.add(bg);
      
      const title = this.add.text(80, 80, 'PROFILE', { fontFamily: 'Arial, sans-serif', fontSize: '48px', fontStyle: 'bold', color: '#ffaa00' });
      this.subMenuContainer.add(title);
      
      const stats = data.playerStats;
      const texts = [
        `Name: ${stats.name}`,
        `Level: ${stats.level}`,
        `HP: ${stats.hp} / ${stats.maxHp}`,
        `MP: ${stats.mp} / ${stats.maxMp}`,
        `EXP: ${stats.exp} / ${stats.expToNext}`,
        `Attack: ${stats.attack}`,
        `Defense: ${stats.defense}`,
        `Speed: ${stats.speed}`
      ];
      
      texts.forEach((t, i) => {
        const text = this.add.text(80, 160 + i * 40, t, { fontFamily: 'Arial, sans-serif', fontSize: '32px', color: '#ffffff' });
        this.subMenuContainer.add(text);
      });
    } else if (type === 'BAG') {
      bg.fillRect(60, 60, width - 120, height - 120);
      bg.strokeRect(60, 60, width - 120, height - 120);
      this.subMenuContainer.add(bg);
      
      const title = this.add.text(80, 80, 'BAG', { fontFamily: 'Arial, sans-serif', fontSize: '48px', fontStyle: 'bold', color: '#ffaa00' });
      this.subMenuContainer.add(title);
      
      const items = Object.entries(data.playerStats.items).map(([id, count]) => ({
        id,
        count: count as number,
        name: id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }));
      
      if (items.length === 0) {
        const text = this.add.text(80, 160, 'Your bag is empty.', { fontFamily: 'Arial, sans-serif', fontSize: '32px', color: '#aaaaaa' });
        this.subMenuContainer.add(text);
      } else {
        items.forEach((item: any, i: number) => {
          const isSelected = i === data.selectedIndex;
          const text = this.add.text(120, 160 + i * 50, `${item.name} x${item.count}`, { 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '32px', 
            color: isSelected ? '#ffaa00' : '#ffffff',
            fontStyle: isSelected ? 'bold' : 'normal'
          });
          this.subMenuContainer.add(text);
          
          if (isSelected) {
            const pointer = this.add.text(80, 160 + i * 50, '>', { fontFamily: 'Arial, sans-serif', fontSize: '32px', color: '#ffaa00' });
            this.subMenuContainer.add(pointer);
          }
        });
        
        const helpText = this.add.text(80, height - 120, '[X] Use Item  [C] Close', { fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#aaaaaa' });
        this.subMenuContainer.add(helpText);
      }
    } else if (type === 'MAP') {
      bg.fillRect(60, 60, width - 120, height - 120);
      bg.strokeRect(60, 60, width - 120, height - 120);
      this.subMenuContainer.add(bg);
      
      const title = this.add.text(80, 80, 'MAP OVERVIEW', { fontFamily: 'Arial, sans-serif', fontSize: '48px', fontStyle: 'bold', color: '#ffaa00' });
      this.subMenuContainer.add(title);
      
      const mapData = data.mapData;
      const tileSize = 24; // Increased tile size for 1080p
      const mapW = mapData[0].length * tileSize;
      const mapH = mapData.length * tileSize;
      const startX = 60 + (width - 120 - mapW) / 2;
      const startY = 60 + (height - 120 - mapH) / 2 + 40;
      
      const mapGraphics = this.add.graphics();
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          const tile = mapData[y][x];
          if (tile === 1) mapGraphics.fillStyle(0x5ca85c); // Grass
          else if (tile === 2) mapGraphics.fillStyle(0x8b4513); // Dirt
          else if (tile === 3) mapGraphics.fillStyle(0x3a7a3a); // Tall Grass
          else if (tile === 4) mapGraphics.fillStyle(0x228b22); // Tree
          else if (tile === 5) mapGraphics.fillStyle(0x888888); // Rock
          else mapGraphics.fillStyle(0x000000);
          
          mapGraphics.fillRect(startX + x * tileSize, startY + y * tileSize, tileSize, tileSize);
        }
      }
      
      // Draw player position
      mapGraphics.fillStyle(0xff0000);
      mapGraphics.fillCircle(startX + data.playerPos.x * tileSize + tileSize/2, startY + data.playerPos.y * tileSize + tileSize/2, tileSize/2);
      
      this.subMenuContainer.add(mapGraphics);
    }
  }

  hideSubMenu() {
    if (this.subMenuContainer) {
      this.subMenuContainer.destroy();
    }
  }

  updateUI(parent: any, key: string, data: any) {
    if (key === 'playerStats') {
      this.playerStats = data;
      this.lvlText.setText(`LVL ${this.playerStats.level}`);
      this.hpBar.width = 200 * (this.playerStats.hp / this.playerStats.maxHp);
      this.hpText.setText(`${this.playerStats.hp} / ${this.playerStats.maxHp}`);
      this.mpBar.width = 200 * (this.playerStats.mp / this.playerStats.maxMp);
      this.mpText.setText(`${this.playerStats.mp} / ${this.playerStats.maxMp}`);
      this.expBar.width = 200 * (this.playerStats.exp / this.playerStats.expToNext);
      this.expText.setText(`SOUL PROGRESS: ${Math.floor((this.playerStats.exp / this.playerStats.expToNext) * 100)}%`);
    }
  }
}

class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private playerShadow!: Phaser.GameObjects.Ellipse;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private isMoving = false;
  public isEncountering = false;
  private targetPosition = new Phaser.Math.Vector2();
  private moveSpeed = 150; // pixels per second
  private playerStats: any;
  private isOptionMenuOpen = false;
  private selectedOptionMenuIndex = 0;
  private isSubMenuOpen = false;
  private selectedSubMenuIndex = 0;
  private currentSubMenuType = '';
  private xKey!: Phaser.Input.Keyboard.Key;
  private cKey!: Phaser.Input.Keyboard.Key;
  private oKey!: Phaser.Input.Keyboard.Key;
  private bossSprite?: Phaser.GameObjects.Sprite;
  private bossDefeated: boolean = false;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('knightsprite', '/knightsprite.png', { frameWidth: 256, frameHeight: 384 });
    this.load.image('pedestal', '/pedestal.png');
    this.load.image('knight_player', '/knighttrans.png');
    this.load.image('battle_bg', '/dungeonback.png');
    this.load.image('portrait', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhqSFlYxL9HGDfe4YQbcOTJ6PfaB34t9TSJqsFtqLJn-o6_BY-1A1JcgFe15MCLBw4wrtJ2ObU5jMgvGwNmo6cLem-SdCyIndeSeO1sxwINBFnb5Nb3Kcnxe9AVqLuLs8SYHwS7yLtY-FfO6aasq08chfn5heq6oS4UbpNz_obEKpof3eE6_NYUhW5e3QsOsJSC6M_8oGr_Z6-Lzyf6dk4C7MpxJs9YNMEPhEURUG9UW7NoQ_qImaTwSJM6tghzatYkVePM484T3I');
    
    // New Battle Assets
    this.load.image('battle_bg_gothic', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc-FnVREY3K9oIUp7QClt1yv5bOTZd4STvgBww52lmy2rQm_kHoEGW2P2lSgTRO70CJ3oZQEohLRudAmbDu68IKdUPjLzHAbnxjh8guyUEuqbxXobectC5DbCb7HuBKcHKGoe_71LPQKVVteL3ehRRZvHQqyX5fpdfHaDXfLxjRGNYVepHfI6JHUZFkFctBHzsycpNxJVV2BzHbrbYfX2ffqx3sLcjRucIIYzvbrT_DaPQl4GYUMDW6SN1GA0KgeRjln9hbHw3FiIE');
    this.load.image('pedestal_gothic', 'https://lh3.googleusercontent.com/aida/ADBb0uiz95RurvVamrU2dlEqGKZjDgJ849LYVbUJBPJfBKRpFEzvA1_MkRRscl4nDCwn7cANrTMejqpM-uMoyQ9VLh3Z5q3HAHMtGr2qgJjZSMf679B-34GoO4IZJU8RyJak0rS33cIsLIo7iM54JAH1yHv_vI7rNp-dT9uHDcpVRjmnqkjumQxEXhBR_nIZonbbAa-Xekk_K46a_edmG3R2MVquEoLDThMnWqeFqxB8-X96PPcJELGdUDnW3hoRH1Hjl-dCP5RCnF0JHQA');
    this.load.image('player_battle', 'https://lh3.googleusercontent.com/aida/ADBb0ujE3IraH8OUi8R_PEH3QDEetL29ThK0m2sUNtzK5poT2NJr4v_wEQSdI3Dkf1MThKrdMeLfJ5BUd2RDUiRW5e73toPOHnt27TWmjIrdAWREztXAhnzYJbvIDSWogBfe9dOmSzRhdHZWGtTsAzYIaxcNyTU2UhNSGnTTffHdZfgRSMY6Q9QkyvGwJKW_ieRKvK2cdZN7nohOuGdIDBzahIs2p9FVJvZu8ix4dPtcC8fnAhTK9vGvPSpxgM2zKl3oectcP0NW6VSaY10');
    this.load.image('enemy_battle', 'https://lh3.googleusercontent.com/aida/ADBb0uj8yP12Fwtk4Lx6-Pi4HWEDGzRncA77B072AltfZXAtLoQWX5SYgH54Om4cpJ2fozO30cyAnujPs25Q_gsg2G2CJ7UjA4g6b6vOvsua1MgzFWZlKCdwH8gg-S20Li5yClGJKUWo4GDQT2Fne3vyFcPOukQIJ3ebib5VY1zot6VhdQtLsYyjQidD7R1nhxv0EqkXn5yDYDsQqd5lBtE74R1SaoUqqjEdx5c76kgeDMluzbr0pay_ay1qI_LuZ21BCQxiWUwgF06ctw0');
    
    // New Enemy Assets
    this.load.image('vampire_img', '/rogue_trans.png');
    this.load.image('skeleton_img', '/skeleton_trans.png');
    this.load.image('zombie_img', '/zombie_trans.png');

    const makeTex = (name: string, drawFn: (g: Phaser.GameObjects.Graphics) => void, w: number = TILE_SIZE, h: number = TILE_SIZE) => {
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      drawFn(g);
      g.generateTexture(name, w, h);
      g.destroy();
    };

    // Particles for Fire Ball
    const fireG = this.make.graphics({ x: 0, y: 0 }, false);
    fireG.fillStyle(0xff4500, 1);
    fireG.fillCircle(4, 4, 4);
    fireG.generateTexture('fire', 8, 8);
    fireG.destroy();

    const makeDetailedTex = (name: string, drawFn: (g: Phaser.GameObjects.Graphics) => void) => {
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      drawFn(g);
      g.generateTexture(name, 128, 128);
      g.destroy();
    };

    makeTex('stairs', g => {
      // Simple stairs
      g.fillStyle(0x333333);
      g.fillRect(0, 0, 32, 32);
      g.fillStyle(0x444444);
      g.fillRect(0, 24, 32, 8);
      g.fillRect(0, 16, 24, 8);
      g.fillRect(0, 8, 16, 8);
      g.fillRect(0, 0, 8, 8);
    });

    makeTex('boss', g => {
      const data = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
        [0,0,0,1,2,2,3,2,2,3,2,2,1,0,0,0],
        [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
        [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
        [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ];
      // Colors: 0=clear, 1=black, 2=dark red, 3=yellow
      const colors = [0, 0x000000, 0x8b0000, 0xffff00];
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const c = data[y][x];
          if (c !== 0) {
            g.fillStyle(colors[c]);
            g.fillRect(x * 2, y * 2, 2, 2);
          }
        }
      }
    });

    makeDetailedTex('boss_detailed', g => {
      // Gothic Demon Lord - Realistic
      // Wings (Leathery, dark red)
      g.fillStyle(0x1a0000); // Darker base
      g.beginPath();
      g.moveTo(64, 64); g.lineTo(10, 20); g.lineTo(30, 60); g.lineTo(10, 80); g.lineTo(64, 80);
      g.closePath(); g.fill();
      
      g.beginPath();
      g.moveTo(64, 64); g.lineTo(118, 20); g.lineTo(98, 60); g.lineTo(118, 80); g.lineTo(64, 80);
      g.closePath(); g.fill();
      
      // Wing highlights (leathery sheen)
      g.fillStyle(0x3a0000);
      g.beginPath();
      g.moveTo(64, 64); g.lineTo(20, 30); g.lineTo(35, 55); g.lineTo(20, 70); g.lineTo(64, 75);
      g.closePath(); g.fill();
      
      g.beginPath();
      g.moveTo(64, 64); g.lineTo(108, 30); g.lineTo(93, 55); g.lineTo(108, 70); g.lineTo(64, 75);
      g.closePath(); g.fill();
      
      // Wing bones (Thick, dark)
      g.lineStyle(4, 0x0a0a0a);
      g.beginPath();
      g.moveTo(64, 64); g.lineTo(10, 20);
      g.moveTo(64, 64); g.lineTo(30, 60);
      g.moveTo(64, 64); g.lineTo(10, 80);
      g.moveTo(64, 64); g.lineTo(118, 20);
      g.moveTo(64, 64); g.lineTo(98, 60);
      g.moveTo(64, 64); g.lineTo(118, 80);
      g.strokePath();
      // Bone highlights
      g.lineStyle(1, 0x3a3a3a);
      g.beginPath();
      g.moveTo(64, 62); g.lineTo(12, 22);
      g.moveTo(64, 62); g.lineTo(32, 60);
      g.moveTo(64, 62); g.lineTo(12, 78);
      g.moveTo(64, 62); g.lineTo(116, 22);
      g.moveTo(64, 62); g.lineTo(96, 60);
      g.moveTo(64, 62); g.lineTo(116, 78);
      g.strokePath();

      // Body (Dark grey/black armor)
      g.fillStyle(0x1a1a1a);
      g.fillEllipse(64, 80, 40, 60);
      // Body shading
      g.fillStyle(0x0a0a0a);
      g.fillEllipse(64, 95, 30, 40); // Lower shadow
      // Body highlight (metallic)
      g.fillStyle(0x3a3a3a);
      g.fillEllipse(64, 65, 20, 30);
      
      // Armor details (Ornate Gold)
      g.lineStyle(4, 0x8b6508); // Dark gold base
      g.strokeEllipse(64, 80, 40, 60);
      g.beginPath();
      g.moveTo(64, 50); g.lineTo(64, 110);
      g.moveTo(44, 80); g.lineTo(84, 80);
      g.strokePath();
      
      // Gold highlights
      g.lineStyle(2, 0xffd700); // Bright gold
      g.strokeEllipse(64, 80, 38, 58);
      g.beginPath();
      g.moveTo(63, 52); g.lineTo(63, 108);
      g.moveTo(46, 79); g.lineTo(82, 79);
      g.strokePath();
      
      // Head
      g.fillStyle(0x550000); // Darker red face base
      g.fillEllipse(64, 40, 30, 40);
      g.fillStyle(0x8b0000); // Mid tone
      g.fillEllipse(64, 35, 20, 30);
      g.fillStyle(0xaa0000); // Highlight
      g.fillEllipse(64, 30, 10, 15);
      
      // Horns (Curved, textured)
      g.fillStyle(0x1a1a1a);
      g.beginPath(); g.moveTo(55, 25); g.lineTo(30, 0); g.lineTo(60, 20); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(73, 25); g.lineTo(98, 0); g.lineTo(68, 20); g.closePath(); g.fill();
      // Horn highlights
      g.fillStyle(0x3a3a3a);
      g.beginPath(); g.moveTo(53, 25); g.lineTo(32, 5); g.lineTo(58, 20); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(75, 25); g.lineTo(96, 5); g.lineTo(70, 20); g.closePath(); g.fill();

      // Eyes (Glowing yellow with bloom)
      g.fillStyle(0xffaa00, 0.4); g.fillEllipse(55, 40, 12, 8); g.fillEllipse(73, 40, 12, 8); // Bloom
      g.fillStyle(0xffff00, 0.8); g.fillEllipse(55, 40, 8, 4); g.fillEllipse(73, 40, 8, 4);   // Mid
      g.fillStyle(0xffffff); g.fillEllipse(55, 40, 4, 2); g.fillEllipse(73, 40, 4, 2);       // Core
      
      // Mouth (Jagged maw)
      g.fillStyle(0x000000);
      g.fillEllipse(64, 52, 16, 6);
      g.fillStyle(0xffffff);
      g.fillTriangle(58, 50, 62, 50, 60, 54);
      g.fillTriangle(66, 50, 70, 50, 68, 54);
    });

    // Map Textures
    makeTex('floor', g => {
      g.fillStyle(0x555555); g.fillRect(0, 0, 32, 32);
      g.fillStyle(0x444444); g.fillRect(0, 0, 31, 31);
      g.fillStyle(0x666666); g.fillRect(1, 1, 30, 30);
    });

    makeTex('wall', g => {
      g.fillStyle(0x222222); g.fillRect(0, 0, 32, 32);
      g.fillStyle(0x333333);
      g.fillRect(0, 0, 15, 15);
      g.fillRect(16, 0, 16, 15);
      g.fillRect(0, 16, 32, 16);
    });

    makeTex('pillar', g => {
      // Shadow
      g.fillStyle(0x000000, 0.4); g.fillEllipse(16, 28, 24, 8);
      // Base
      g.fillStyle(0x444444); g.fillRect(4, 20, 24, 12);
      // Shaft
      g.fillStyle(0x555555); g.fillRect(8, 0, 16, 24);
      g.fillStyle(0x666666); g.fillRect(10, 0, 4, 24);
    }, 32, 32);

    makeTex('barrel', g => {
      // Shadow
      g.fillStyle(0x000000, 0.4); g.fillEllipse(16, 28, 20, 8);
      // Wood
      g.fillStyle(0x8b5a2b); g.fillRect(6, 8, 20, 22);
      g.fillStyle(0x6b4226); g.fillRect(6, 8, 4, 22);
      g.fillStyle(0xa06b3a); g.fillRect(14, 8, 4, 22);
      // Bands
      g.fillStyle(0x333333); 
      g.fillRect(6, 12, 20, 2);
      g.fillRect(6, 24, 20, 2);
    }, 32, 32);

    makeTex('chest', g => {
      // Shadow
      g.fillStyle(0x000000, 0.4); g.fillEllipse(16, 28, 28, 10);
      // Box
      g.fillStyle(0x6b4226); g.fillRect(2, 12, 28, 18);
      g.fillStyle(0x8b5a2b); g.fillRect(4, 14, 24, 14);
      // Lid
      g.fillStyle(0x5c3a21); g.fillRect(2, 4, 28, 8);
      // Lock
      g.fillStyle(0xaaaaaa); g.fillRect(14, 10, 4, 6);
    }, 32, 32);

    makeTex('altar', g => {
      // Shadow
      g.fillStyle(0x000000, 0.4); g.fillEllipse(16, 28, 30, 12);
      // Base
      g.fillStyle(0x444444); g.fillRect(0, 16, 32, 14);
      // Top
      g.fillStyle(0x555555); g.fillRect(0, 8, 32, 8);
      // Blood
      g.fillStyle(0xaa0000); g.fillRect(12, 8, 8, 4);
      g.fillRect(14, 12, 2, 6);
    }, 32, 32);

    makeTex('rock', g => {
      // Shadow
      g.fillStyle(0x000000, 0.4); g.fillEllipse(16, 28, 26, 10);
      // Rock
      g.fillStyle(0x555555); g.fillCircle(16, 16, 12);
      g.fillCircle(10, 20, 8);
      g.fillCircle(22, 18, 10);
      g.fillStyle(0x666666); g.fillCircle(14, 14, 6);
    }, 32, 32);
  }

  create() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
      this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }
    if (!this.registry.has('playerStats')) {
      this.registry.set('playerStats', {
        name: 'Dark Blood',
        level: 1,
        hp: 100,
        maxHp: 100,
        mp: 40,
        maxMp: 40,
        attack: 2,
        speed: 2,
        exp: 0,
        expToNext: 10,
        items: {
          health_potion: 3,
          mana_potion: 1
        },
        skills: [
          { name: 'Thunder', cost: 10, damage: 8, type: 'magic' }
        ]
      });
    }
    this.playerStats = this.registry.get('playerStats');

    // Player Animations
    this.anims.create({
      key: 'player_down',
      frames: this.anims.generateFrameNumbers('knightsprite', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('knightsprite', { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('knightsprite', { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'player_up',
      frames: this.anims.generateFrameNumbers('knightsprite', { start: 12, end: 15 }),
      frameRate: 8,
      repeat: -1
    });

    // Render map
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        const tileType = mapData[y][x];
        const px = x * TILE_SIZE + TILE_SIZE / 2;
        const py = y * TILE_SIZE + TILE_SIZE / 2;
        
        if (tileType === 1) { // Wall
          this.add.sprite(px, py, 'wall').setDepth(0);
        } else if (tileType === 6) { // Stairs
          this.add.sprite(px, py, 'stairs').setDepth(0);
        } else {
          // Floor for everything else
          this.add.sprite(px, py, 'floor').setDepth(0);
          
          if (tileType === 2) { // Pillar
            const s = this.add.sprite(px, py + TILE_SIZE / 2, 'pillar');
            s.setOrigin(0.5, 1);
            s.setScale(1, 2.5 / 1.5);
            s.setDepth(py + TILE_SIZE / 2);
          } else if (tileType === 3) { // Barrel
            const s = this.add.sprite(px, py + TILE_SIZE / 2, 'barrel');
            s.setOrigin(0.5, 1);
            s.setScale(1, 2.5 / 1.5);
            s.setDepth(py + TILE_SIZE / 2);
          } else if (tileType === 4) { // Chest
            const s = this.add.sprite(px, py + TILE_SIZE / 2, 'chest');
            s.setOrigin(0.5, 1);
            s.setScale(1, 2.5 / 1.5);
            s.setDepth(py + TILE_SIZE / 2);
          } else if (tileType === 5) { // Altar
            const s = this.add.sprite(px, py + TILE_SIZE / 2, 'altar');
            s.setOrigin(0.5, 1);
            s.setScale(1, 2.5 / 1.5);
            s.setDepth(py + TILE_SIZE / 2);
          } else if (tileType === 7) { // Rock
            const s = this.add.sprite(px, py + TILE_SIZE / 2, 'rock');
            s.setOrigin(0.5, 1);
            s.setScale(1, 2.5 / 1.5);
            s.setDepth(py + TILE_SIZE / 2);
          }
        }
      }
    }

    // Add player
    const startX = 9.5 * TILE_SIZE;
    const startY = 32 * TILE_SIZE + TILE_SIZE / 2;
    this.playerShadow = this.add.ellipse(startX, startY + TILE_SIZE / 2 - 4, 20, 8, 0x000000, 0.4);
    this.playerShadow.setDepth(9);
    this.player = this.add.sprite(startX, startY + TILE_SIZE / 2, 'knightsprite', 0);
    this.player.setOrigin(0.5, 1);
    this.player.setScale(1);
    this.player.setDepth(startY + TILE_SIZE / 2); // ensure player is above map
    this.targetPosition.set(startX, startY + TILE_SIZE / 2);

    // Set up camera
    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Boss
    this.bossDefeated = this.registry.get('bossDefeated') || false;
    if (!this.bossDefeated) {
      const bossX = 9.5 * TILE_SIZE;
      const bossY = 6 * TILE_SIZE + TILE_SIZE / 2;
      this.bossSprite = this.add.sprite(bossX, bossY + TILE_SIZE / 2, 'boss');
      this.bossSprite.setOrigin(0.5, 1);
      this.bossSprite.setScale(2);
      this.bossSprite.setDepth(bossY + TILE_SIZE / 2);
      
      this.tweens.add({
        targets: this.bossSprite,
        y: bossY + TILE_SIZE / 2 - 2,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Launch the UI Scene
    this.scene.launch('UIScene');
  }

  isSolid(x: number, y: number, direction: string): boolean {
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor((y - TILE_SIZE / 2) / TILE_SIZE);

    if (tileX < 0 || tileX >= mapData[0].length || tileY < 0 || tileY >= mapData.length) {
      return true; // Map bounds
    }

    const tile = mapData[tileY][tileX];
    
    // Solid tiles: Wall(1), Pillar(2), Barrel(3), Chest(4), Altar(5), Rock(7)
    if (tile === 1 || tile === 2 || tile === 3 || tile === 4 || tile === 5 || tile === 7) {
      return true;
    }

    return false;
  }

  triggerEncounter() {
    this.isEncountering = true;
    
    // Gothic transition effect
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Flash dark red
    this.cameras.main.flash(300, 139, 0, 0); // 0x8b0000

    // Jagged shapes closing in
    const topShape = this.add.graphics();
    topShape.fillStyle(0x000000, 1);
    topShape.beginPath();
    topShape.moveTo(0, 0);
    topShape.lineTo(width, 0);
    // Draw jagged bottom edge
    for (let i = 0; i <= 10; i++) {
        topShape.lineTo(width - (width / 10) * i, height / 2 + (i % 2 === 0 ? 50 : 0));
    }
    topShape.lineTo(0, 0);
    topShape.closePath();
    topShape.fill();
    topShape.setDepth(100);
    topShape.y = -height;

    const bottomShape = this.add.graphics();
    bottomShape.fillStyle(0x000000, 1);
    bottomShape.beginPath();
    bottomShape.moveTo(0, height);
    bottomShape.lineTo(width, height);
    // Draw jagged top edge
    for (let i = 0; i <= 10; i++) {
        bottomShape.lineTo(width - (width / 10) * i, height / 2 - (i % 2 === 0 ? 50 : 0));
    }
    bottomShape.lineTo(0, height);
    bottomShape.closePath();
    bottomShape.fill();
    bottomShape.setDepth(100);
    bottomShape.y = height;

    this.tweens.add({
      targets: topShape,
      y: 0,
      duration: 600,
      ease: 'Power2'
    });

    this.tweens.add({
      targets: bottomShape,
      y: 0,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {
        this.cameras.main.fade(200, 0, 0, 0);
        this.time.delayedCall(200, () => {
          topShape.destroy();
          bottomShape.destroy();
          this.scene.sleep('UIScene');
          this.scene.pause();
          this.scene.launch('BattleScene');
        });
      }
    });
  }

  triggerBossEncounter() {
    this.isEncountering = true;
    
    // Set boss stats in registry so BattleScene knows
    this.registry.set('bossEncounter', true);

    // Gothic transition effect
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Flash dark red
    this.cameras.main.flash(300, 139, 0, 0); // 0x8b0000

    // Jagged shapes closing in
    const topShape = this.add.graphics();
    topShape.fillStyle(0x000000, 1);
    topShape.beginPath();
    topShape.moveTo(0, 0);
    topShape.lineTo(width, 0);
    // Draw jagged bottom edge
    for (let i = 0; i <= 10; i++) {
        topShape.lineTo(width - (width / 10) * i, height / 2 + (i % 2 === 0 ? 50 : 0));
    }
    topShape.lineTo(0, 0);
    topShape.closePath();
    topShape.fill();
    topShape.setDepth(100);
    topShape.y = -height;

    const bottomShape = this.add.graphics();
    bottomShape.fillStyle(0x000000, 1);
    bottomShape.beginPath();
    bottomShape.moveTo(0, height);
    bottomShape.lineTo(width, height);
    // Draw jagged top edge
    for (let i = 0; i <= 10; i++) {
        bottomShape.lineTo(width - (width / 10) * i, height / 2 - (i % 2 === 0 ? 50 : 0));
    }
    bottomShape.lineTo(0, height);
    bottomShape.closePath();
    bottomShape.fill();
    bottomShape.setDepth(100);
    bottomShape.y = height;

    this.tweens.add({
      targets: topShape,
      y: 0,
      duration: 600,
      ease: 'Power2'
    });

    this.tweens.add({
      targets: bottomShape,
      y: 0,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {
        this.cameras.main.fade(200, 0, 0, 0);
        this.time.delayedCall(200, () => {
          topShape.destroy();
          bottomShape.destroy();
          this.scene.sleep('UIScene');
          this.scene.pause();
          this.scene.launch('BattleScene');
        });
      }
    });
  }

  endEncounter() {
    this.cameras.main.fadeIn(250, 0, 0, 0);
    this.isEncountering = false;
    this.scene.wake('UIScene');
    if (this.cursors) {
      this.cursors.left.reset();
      this.cursors.right.reset();
      this.cursors.up.reset();
      this.cursors.down.reset();
    }
  }

  openOptionMenu() {
    this.isOptionMenuOpen = true;
    this.selectedOptionMenuIndex = 0;
    (this.scene.get('UIScene') as any).showOptionMenu(this.selectedOptionMenuIndex);
  }

  updateOptionMenu() {
    (this.scene.get('UIScene') as any).updateOptionMenu(this.selectedOptionMenuIndex);
  }

  closeOptionMenu() {
    this.isOptionMenuOpen = false;
    (this.scene.get('UIScene') as any).hideOptionMenu();
  }

  update(time: number, delta: number) {
    // Dynamic depth sorting for player
    this.player.setDepth(this.player.y);
    this.playerShadow.setDepth(this.player.y - 1);

    if (!this.cursors || this.isEncountering) return;

    if (this.isSubMenuOpen && this.input.keyboard) {
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.isSubMenuOpen = false;
            (this.scene.get('UIScene') as any).hideSubMenu();
            this.openOptionMenu();
        } else if (this.currentSubMenuType === 'BAG') {
            const items = Object.entries(this.playerStats.items);
            if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                this.selectedSubMenuIndex = (this.selectedSubMenuIndex - 1 + items.length) % items.length;
                (this.scene.get('UIScene') as any).showSubMenu('BAG', { playerStats: this.playerStats, selectedIndex: this.selectedSubMenuIndex });
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                this.selectedSubMenuIndex = (this.selectedSubMenuIndex + 1) % items.length;
                (this.scene.get('UIScene') as any).showSubMenu('BAG', { playerStats: this.playerStats, selectedIndex: this.selectedSubMenuIndex });
            } else if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
                const [itemId, count] = items[this.selectedSubMenuIndex];
                if ((count as number) > 0) {
                    let used = false;
                    if (itemId === 'health_potion' && this.playerStats.hp < this.playerStats.maxHp) {
                        this.playerStats.hp = Math.min(this.playerStats.maxHp, this.playerStats.hp + 50);
                        used = true;
                    } else if (itemId === 'mana_potion' && this.playerStats.mp < this.playerStats.maxMp) {
                        this.playerStats.mp = Math.min(this.playerStats.maxMp, this.playerStats.mp + 20);
                        used = true;
                    }
                    
                    if (used) {
                        this.playerStats.items[itemId]--;
                        this.registry.set('playerStats', this.playerStats);
                        (this.scene.get('UIScene') as any).showSubMenu('BAG', { playerStats: this.playerStats, selectedIndex: this.selectedSubMenuIndex });
                    }
                }
            }
        }
        return;
    }

    if (this.isOptionMenuOpen && this.input.keyboard) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedOptionMenuIndex = (this.selectedOptionMenuIndex - 1 + 3) % 3;
            this.updateOptionMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedOptionMenuIndex = (this.selectedOptionMenuIndex + 1) % 3;
            this.updateOptionMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            // Confirmation
            const selectedType = ['PROFILE', 'BAG', 'MAP'][this.selectedOptionMenuIndex];
            (this.scene.get('UIScene') as any).confirmOptionMenu(this.selectedOptionMenuIndex, () => {
                this.closeOptionMenu();
                this.isSubMenuOpen = true;
                this.currentSubMenuType = selectedType;
                this.selectedSubMenuIndex = 0;
                const data: any = { playerStats: this.playerStats, selectedIndex: 0 };
                if (selectedType === 'MAP') {
                    data.mapData = mapData;
                    data.playerPos = { x: Math.floor(this.player.x / TILE_SIZE), y: Math.floor(this.player.y / TILE_SIZE) };
                }
                (this.scene.get('UIScene') as any).showSubMenu(selectedType, data);
            });
        } else if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            // Close menu
            this.closeOptionMenu();
        }
        return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.oKey)) {
        if (!this.isEncountering && !this.isMoving) {
            this.openOptionMenu();
        }
        return;
    }

    if (this.isMoving) {
      const moveStep = (this.moveSpeed * delta) / 1000;
      
      if (this.player.x < this.targetPosition.x) {
        this.player.x = Math.min(this.player.x + moveStep, this.targetPosition.x);
      } else if (this.player.x > this.targetPosition.x) {
        this.player.x = Math.max(this.player.x - moveStep, this.targetPosition.x);
      } else if (this.player.y < this.targetPosition.y) {
        this.player.y = Math.min(this.player.y + moveStep, this.targetPosition.y);
      } else if (this.player.y > this.targetPosition.y) {
        this.player.y = Math.max(this.player.y - moveStep, this.targetPosition.y);
      }

      // Update shadow position
      this.playerShadow.x = this.player.x;
      this.playerShadow.y = this.player.y - 4;

      if (this.player.x === this.targetPosition.x && this.player.y === this.targetPosition.y) {
        this.isMoving = false;
        this.moveSpeed = 150; // reset speed after jump

        // Check for boss encounter
        if (!this.bossDefeated && this.bossSprite) {
          const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y - TILE_SIZE / 2, this.bossSprite.x, this.bossSprite.y - TILE_SIZE / 2);
          if (dist < TILE_SIZE) {
            this.triggerBossEncounter();
            return;
          }
        }

        // Check for encounter
        const tileX = Math.floor(this.player.x / TILE_SIZE);
        const tileY = Math.floor((this.player.y - TILE_SIZE / 2) / TILE_SIZE);
        if (mapData[tileY] && mapData[tileY][tileX] === 0) { // 0 is floor
          if (Math.random() < 0.05) { // 5% encounter chance per tile moved
            this.triggerEncounter();
            return;
          }
        }
      }
    } else {
      let moved = false;
      let nextX = this.targetPosition.x;
      let nextY = this.targetPosition.y;
      let direction = '';

      if (this.cursors.left.isDown) {
        nextX -= TILE_SIZE;
        this.player.play('player_left', true);
        this.lastDirection = 'left';
        moved = true;
      } else if (this.cursors.right.isDown) {
        nextX += TILE_SIZE;
        this.player.play('player_right', true);
        this.lastDirection = 'right';
        moved = true;
      } else if (this.cursors.up.isDown) {
        nextY -= TILE_SIZE;
        this.player.play('player_up', true);
        this.lastDirection = 'up';
        moved = true;
      } else if (this.cursors.down.isDown) {
        nextY += TILE_SIZE;
        this.player.play('player_down', true);
        this.lastDirection = 'down';
        moved = true;
      } else {
        this.player.anims.stop();
        if (this.lastDirection === 'left') this.player.setFrame(4);
        else if (this.lastDirection === 'right') this.player.setFrame(8);
        else if (this.lastDirection === 'up') this.player.setFrame(12);
        else if (this.lastDirection === 'down') this.player.setFrame(0);
      }

      if (moved) {
        if (!this.isSolid(nextX, nextY, this.lastDirection)) {
          this.targetPosition.x = nextX;
          this.targetPosition.y = nextY;
          this.isMoving = true;
        }
      }
    }
  }
}

interface MenuButton {
  container: Phaser.GameObjects.Container;
  highlight: () => void;
  unhighlight: () => void;
  action: () => void;
}

class BattleScene extends Phaser.Scene {
  private playerStats: any;
  private enemyStats: any;
  private battleState: string = 'PLAYER_TURN';
  private playerHpText!: Phaser.GameObjects.Text;
  private playerMpText!: Phaser.GameObjects.Text;
  private enemyHpText!: Phaser.GameObjects.Text;
  private enemyHpBar!: Phaser.GameObjects.Rectangle;
  private playerHpBar!: Phaser.GameObjects.Rectangle;
  private playerMpBar!: Phaser.GameObjects.Rectangle;
  private playerExpBar!: Phaser.GameObjects.Rectangle;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private enemySprite!: Phaser.GameObjects.Sprite;
  private menuButtons: MenuButton[] = [];
  private selectedMenuIndex = 0; // Default to FIGHT
  private bagMenuContainer!: Phaser.GameObjects.Container;
  private isBagMenuOpen: boolean = false;
  private selectedBagIndex: number = 0;
  private bagItems: { name: string, count: number, id: string }[] = [];
  private skillMenuContainer!: Phaser.GameObjects.Container;
  private isSkillMenuOpen: boolean = false;
  private selectedSkillIndex: number = 0;
  private skills: { name: string, cost: number, damage: number, type: string }[] = [];
  private xKey!: Phaser.Input.Keyboard.Key;
  private cKey!: Phaser.Input.Keyboard.Key;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private battleLogText!: Phaser.GameObjects.Text;

  constructor() {
    super('BattleScene');
  }

  create() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    this.playerStats = this.registry.get('playerStats');
    const pLvl = this.playerStats.level;
    
    const enemies = [
      { name: 'Skeleton', level: pLvl, hp: 10 + (pLvl - 1), maxHp: 10 + (pLvl - 1), attack: 1 + (pLvl - 1), speed: 1 + (pLvl - 1), expReward: 5 + (pLvl - 1), texture: 'skeleton_img' },
      { name: 'Zombie', level: pLvl, hp: 8 + (pLvl - 1), maxHp: 8 + (pLvl - 1), attack: 2 + (pLvl - 1), speed: 1 + (pLvl - 1), expReward: 4 + (pLvl - 1), texture: 'zombie_img' },
      { name: 'Vampire', level: pLvl, hp: 6 + (pLvl - 1), maxHp: 6 + (pLvl - 1), attack: 3 + (pLvl - 1), speed: 1 + (pLvl - 1), expReward: 6 + (pLvl - 1), texture: 'vampire_img' }
    ];
    
    if (this.registry.get('bossEncounter')) {
      this.enemyStats = { name: 'Demon Lord', level: 10, hp: 100, maxHp: 100, attack: 10, speed: 10, expReward: 500, texture: 'boss', isBoss: true };
      this.registry.set('bossEncounter', false); // reset
    } else {
      this.enemyStats = enemies[Math.floor(Math.random() * enemies.length)];
    }
    
    this.battleState = 'PLAYER_TURN';
    this.menuButtons = [];

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background: Gothic Dungeon Image
    const bg = this.add.image(width / 2, height / 2, 'battle_bg_gothic');
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);
    bg.setTint(0x2a2a2a); // Darken for atmosphere

    const containerTop = (height - 800) / 2;
    const containerBottom = containerTop + 800;
    const playerX = 192 + 250;
    const enemyX = width - 192 - 250;

    const pedestalY = containerBottom - 100;
    const spriteY = containerBottom - 32;

    // Pedestals
    const playerPedestal = this.add.image(playerX, pedestalY, 'pedestal_gothic').setDisplaySize(500, 200).setAlpha(0.8);
    const enemyPedestal = this.add.image(enemyX, pedestalY, 'pedestal_gothic').setDisplaySize(500, 200).setAlpha(0.8);

    // Enemy Sprite
    this.enemySprite = this.add.sprite(enemyX, spriteY, 'enemy_battle');
    this.enemySprite.setOrigin(0.5, 1);
    const enemyScale = 600 / this.enemySprite.height;
    this.enemySprite.setScale(enemyScale);
    this.enemySprite.setFlipX(true);
    this.enemySprite.setTint(0xcccccc); // Darken slightly

    // Player Sprite
    this.playerSprite = this.add.sprite(playerX, spriteY, 'player_battle');
    this.playerSprite.setOrigin(0.5, 1);
    const playerScale = 600 / this.playerSprite.height;
    this.playerSprite.setScale(playerScale);
    this.playerSprite.setDepth(5);

    // --- PLAYER STATS PANEL ---
    const pStatsX = playerX - 160;
    const pStatsY = containerTop;
    const pStatsW = 320;
    const pStatsH = 220;

    const playerPanel = this.add.graphics();
    playerPanel.setDepth(15);
    playerPanel.fillStyle(0x1c1b1b, 0.9);
    playerPanel.fillRect(pStatsX, pStatsY, pStatsW, pStatsH);
    playerPanel.lineStyle(1, 0xffb4a8, 0.2);
    playerPanel.beginPath();
    playerPanel.moveTo(pStatsX, pStatsY); playerPanel.lineTo(pStatsX + pStatsW, pStatsY);
    playerPanel.moveTo(pStatsX, pStatsY + pStatsH); playerPanel.lineTo(pStatsX + pStatsW, pStatsY + pStatsH);
    playerPanel.strokePath();

    this.add.text(pStatsX + 20, pStatsY + 20, 'PLAYER', {
      fontFamily: 'Noto Serif, serif', fontSize: '24px', color: '#e5e2e1', letterSpacing: 4
    }).setDepth(15);

    const drawBar = (x: number, y: number, label: string, valueStr: string, color: number, percent: number, isEnemy: boolean = false) => {
      this.add.text(x, y, label, { fontFamily: 'Newsreader, serif', fontSize: '11px', fontStyle: 'bold', color: isEnemy ? '#7f1d1d' : '#a8a29e', letterSpacing: 2 }).setDepth(15);
      const valText = this.add.text(x + 280, y, valueStr, { fontFamily: 'Newsreader, serif', fontSize: '11px', fontStyle: 'bold', color: `#${color.toString(16).padStart(6, '0')}` }).setOrigin(1, 0).setDepth(15);
      
      this.add.rectangle(x, y + 20, 280, 10, 0x0c0a09).setOrigin(0).setDepth(15).setStrokeStyle(1, 0x292524);
      const bar = this.add.rectangle(x, y + 20, 280 * percent, 10, color).setOrigin(0).setDepth(15);
      return { valText, bar };
    };

    const hpUI = drawBar(pStatsX + 20, pStatsY + 60, 'HEALTH', `${this.playerStats.hp} / ${this.playerStats.maxHp}`, 0xffb4a8, this.playerStats.hp / this.playerStats.maxHp);
    this.playerHpText = hpUI.valText;
    this.playerHpBar = hpUI.bar;

    const mpUI = drawBar(pStatsX + 20, pStatsY + 110, 'MANA', `${this.playerStats.mp} / ${this.playerStats.maxMp}`, 0xddb7ff, this.playerStats.mp / this.playerStats.maxMp);
    this.playerMpText = mpUI.valText;
    this.playerMpBar = mpUI.bar;

    const expUI = drawBar(pStatsX + 20, pStatsY + 160, 'EXP', `${Math.floor((this.playerStats.exp / this.playerStats.expToNext) * 100)}%`, 0xe9c349, this.playerStats.exp / this.playerStats.expToNext);
    this.playerExpBar = expUI.bar;

    // --- ENEMY STATS PANEL ---
    const eStatsX = enemyX - 160;
    const eStatsY = containerTop;
    const eStatsW = 320;
    const eStatsH = 120;

    const enemyPanel = this.add.graphics();
    enemyPanel.setDepth(15);
    enemyPanel.fillStyle(0x1c1b1b, 0.9);
    enemyPanel.fillRect(eStatsX, eStatsY, eStatsW, eStatsH);
    enemyPanel.lineStyle(1, 0x7f1d1d, 0.4);
    enemyPanel.beginPath();
    enemyPanel.moveTo(eStatsX, eStatsY); enemyPanel.lineTo(eStatsX + eStatsW, eStatsY);
    enemyPanel.moveTo(eStatsX, eStatsY + eStatsH); enemyPanel.lineTo(eStatsX + eStatsW, eStatsY + eStatsH);
    enemyPanel.strokePath();

    this.add.text(eStatsX + eStatsW - 20, eStatsY + 20, 'ENEMY', {
      fontFamily: 'Noto Serif, serif', fontSize: '24px', color: '#e5e2e1', letterSpacing: 4
    }).setOrigin(1, 0).setDepth(15);

    const enemyHpUI = drawBar(eStatsX + 20, eStatsY + 60, 'HEALTH', `${Math.floor((this.enemyStats.hp / this.enemyStats.maxHp) * 100)}%`, 0xffb4a8, this.enemyStats.hp / this.enemyStats.maxHp, true);
    this.enemyHpText = enemyHpUI.valText;
    this.enemyHpBar = enemyHpUI.bar;

    // --- BATTLE LOG ---
    const logY = height - 250;
    this.battleLogText = this.add.text(width / 2, logY, '', {
      fontFamily: 'Newsreader, serif',
      fontSize: '24px',
      color: '#e5e2e1',
      fontStyle: 'italic'
    }).setOrigin(0.5).setDepth(10);

    this.logMessage(`A wild ${this.enemyStats.name} appeared!`);

    // --- COMBAT ACTIONS OVERLAY ---
    const bottomOverlay = this.add.graphics();
    bottomOverlay.setDepth(10);
    bottomOverlay.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 0, 0.9, 0.9);
    bottomOverlay.fillRect(0, height - 200, width, 200);

    const createMenuButton = (targetX: number, targetY: number, textStr: string, iconStr: string, colorHex: number, onClick: () => void): MenuButton => {
      const container = this.add.container(targetX, targetY);
      container.setDepth(20);

      const btnGraphics = this.add.graphics();
      const w = 240;
      const h = 100;
      
      const drawBg = (isHover: boolean) => {
        btnGraphics.clear();
        btnGraphics.fillStyle(0x0c0a09, 0.8);
        btnGraphics.fillRect(-w/2, -h/2, w, h);
        btnGraphics.lineStyle(1, isHover ? colorHex : 0x292524, 1);
        btnGraphics.strokeRect(-w/2, -h/2, w, h);
        
        if (isHover) {
          btnGraphics.fillStyle(colorHex, 1);
          btnGraphics.fillRect(-w/2, h/2 - 3, w, 3);
        }
      };

      drawBg(false);
      container.add(btnGraphics);

      const text = this.add.text(0, 10, textStr, {
        fontFamily: 'Noto Serif, serif',
        fontSize: '24px',
        color: '#e5e2e1',
        letterSpacing: 2
      }).setOrigin(0.5);
      container.add(text);

      // We don't have material icons loaded, so we'll just use text or omit icon.
      // Let's just use text for now, centered properly.
      text.setY(0);

      return {
        container,
        highlight: () => {
          drawBg(true);
          text.setColor(`#${colorHex.toString(16).padStart(6, '0')}`);
        },
        unhighlight: () => {
          drawBg(false);
          text.setColor('#e5e2e1');
        },
        action: onClick
      };
    };

    const menuYStart = height - 100;
    const spacingX = 264;
    const startX = width / 2 - (spacingX * 1.5);

    this.menuButtons.push(createMenuButton(startX, menuYStart, 'ATTACK', 'swords', 0xffb4a8, () => {
      if (this.battleState !== 'PLAYER_TURN') return;
      this.handleFightAction();
    }));
    
    this.menuButtons.push(createMenuButton(startX + spacingX, menuYStart, 'SKILL', 'auto_fix_high', 0xddb7ff, () => {
      this.openSkillMenu();
    }));

    this.menuButtons.push(createMenuButton(startX + spacingX * 2, menuYStart, 'ITEM', 'experiment', 0xe9c349, () => {
      this.openBagMenu();
    }));
    
    this.menuButtons.push(createMenuButton(startX + spacingX * 3, menuYStart, 'RUN', 'directions_run', 0x7f1d1d, () => {
      if (this.battleState !== 'PLAYER_TURN') return;
      this.handleRunAction();
    }));

    this.updateMenuSelection();
  }

  logMessage(msg: string) {
    this.battleLogText.setText(msg.toUpperCase());
    this.battleLogText.setAlpha(1);
  }

  handleFightAction() {
    if (this.battleState !== 'PLAYER_TURN') return;
    this.battleState = 'ANIMATING';

    // Hide UI during attack
    this.menuButtons.forEach(btn => btn.container.setVisible(false));
    this.logMessage(`Player attacks ${this.enemyStats.name}!`);

    const damage = Math.max(1, this.playerStats.attack);
    this.enemyStats.hp = Math.max(0, this.enemyStats.hp - damage);
    
    this.enemyHpText.setText(`${Math.floor((this.enemyStats.hp / this.enemyStats.maxHp) * 100)}%`);
    this.enemyHpBar.width = 280 * (this.enemyStats.hp / this.enemyStats.maxHp);
    
    this.showDamage(this.enemySprite.x, this.enemySprite.y, damage, '#ffffff');

    this.time.delayedCall(500, () => {
      if (this.enemyStats.hp <= 0) {
        this.logMessage(`${this.enemyStats.name} defeated!`);
        this.endBattle(true);
      } else {
        this.enemyTurn();
      }
    });
  }

  handleRunAction() {
    this.scene.stop();
    this.scene.resume('GameScene');
    const gameScene = this.scene.get('GameScene') as any;
    gameScene.endEncounter();
  }

  updateMenuSelection() {
    this.menuButtons.forEach((btn, index) => {
      if (index === this.selectedMenuIndex) {
        btn.highlight();
      } else {
        btn.unhighlight();
      }
    });
  }

  openSkillMenu() {
    if (this.battleState !== 'PLAYER_TURN') return;
    this.isSkillMenuOpen = true;
    this.selectedSkillIndex = 0;
    this.menuButtons.forEach(btn => btn.container.setVisible(false));
    this.createSkillMenu();
  }

  createSkillMenu() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.skillMenuContainer = this.add.container(0, 0);
    this.skillMenuContainer.setDepth(100);
    
    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a051a, 0.95); // Dark gothic purple
    bg.lineStyle(4, 0xd4af37, 1); // Gold border
    const menuW = 500;
    const menuH = 400;
    const menuX = width / 2 - menuW / 2;
    const menuY = height / 2 - menuH / 2;
    bg.fillRect(menuX, menuY, menuW, menuH);
    bg.strokeRect(menuX, menuY, menuW, menuH);
    
    // Inner decorative line
    bg.lineStyle(1, 0xd4af37, 0.5);
    bg.strokeRect(menuX + 6, menuY + 6, menuW - 12, menuH - 12);
    this.skillMenuContainer.add(bg);
    
    // Items
    this.skills = this.playerStats.skills || [];
    
    this.skills.forEach((skill, index) => {
        const text = this.add.text(menuX + 40, menuY + 40 + index * 50, `${skill.name.toUpperCase()} (${skill.cost} MP)`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '32px',
            color: index === this.selectedSkillIndex ? '#ff0000' : '#ffffff'
        });
        this.skillMenuContainer.add(text);
    });
  }

  updateSkillMenu() {
    this.skillMenuContainer.removeAll(true);
    this.createSkillMenu();
  }

  useSkill(skill: { name: string, cost: number, damage: number, type: string }) {
    if (this.playerStats.mp >= skill.cost) {
      this.logMessage(`Player uses ${skill.name}!`);
      this.playerStats.mp -= skill.cost;
      this.playerMpText.setText(`${this.playerStats.mp} / ${this.playerStats.maxMp}`);
      this.playerMpBar.width = 280 * (this.playerStats.mp / this.playerStats.maxMp);
      
      this.isSkillMenuOpen = false;
      this.skillMenuContainer.destroy();
      this.battleState = 'ANIMATING';

      this.finishSkill(skill);
    } else {
        this.logMessage("Not enough MP!");
    }
  }

  finishSkill(skill: any) {
    this.enemyStats.hp = Math.max(0, this.enemyStats.hp - skill.damage);
    this.enemyHpText.setText(`${Math.floor((this.enemyStats.hp / this.enemyStats.maxHp) * 100)}%`);
    this.enemyHpBar.width = 280 * (this.enemyStats.hp / this.enemyStats.maxHp);
    
    this.showDamage(this.enemySprite.x, this.enemySprite.y, skill.damage, skill.type === 'magic' ? '#ffff00' : '#ff0000');
    
    this.time.delayedCall(500, () => {
      if (this.enemyStats.hp <= 0) {
        this.logMessage(`${this.enemyStats.name} defeated!`);
        this.endBattle(true);
      } else {
        this.enemyTurn();
      }
    });
  }

  openBagMenu() {
    if (this.battleState !== 'PLAYER_TURN') return;
    this.isBagMenuOpen = true;
    this.selectedBagIndex = 0;
    this.menuButtons.forEach(btn => btn.container.setVisible(false));
    this.createBagMenu();
  }

  createBagMenu() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.bagMenuContainer = this.add.container(0, 0);
    this.bagMenuContainer.setDepth(100);
    
    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a051a, 0.95); // Dark gothic purple
    bg.lineStyle(4, 0xd4af37, 1); // Gold border
    const menuW = 500;
    const menuH = 400;
    const menuX = width / 2 - menuW / 2;
    const menuY = height / 2 - menuH / 2;
    bg.fillRect(menuX, menuY, menuW, menuH);
    bg.strokeRect(menuX, menuY, menuW, menuH);
    
    // Inner decorative line
    bg.lineStyle(1, 0xd4af37, 0.5);
    bg.strokeRect(menuX + 6, menuY + 6, menuW - 12, menuH - 12);
    this.bagMenuContainer.add(bg);
    
    // Items
    const items = Object.entries(this.playerStats.items);
    this.bagItems = items.map(([name, count]) => ({ 
      name: name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), 
      count: count as number, 
      id: name 
    }));
    
    this.bagItems.forEach((item, index) => {
        const text = this.add.text(menuX + 40, menuY + 40 + index * 50, `${item.name.toUpperCase()} x${item.count}`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '32px',
            color: index === this.selectedBagIndex ? '#ff0000' : '#ffffff'
        });
        this.bagMenuContainer.add(text);
    });
  }

  updateBagMenu() {
    this.bagMenuContainer.removeAll(true);
    this.createBagMenu();
  }

  useItem(item: { name: string, count: number, id: string }) {
    if (item.count > 0) {
      if (item.id === 'health_potion') {
        this.playerStats.hp = Math.min(this.playerStats.maxHp, this.playerStats.hp + 50);
        this.showDamage(this.playerSprite.x, this.playerSprite.y, 50, '#00ff00');
      } else if (item.id === 'mana_potion') {
        this.playerStats.mp = Math.min(this.playerStats.maxMp, this.playerStats.mp + 20);
        this.showDamage(this.playerSprite.x, this.playerSprite.y, 20, '#00aaff');
      }
      
      this.playerStats.items[item.id]--;
      this.playerHpText.setText(`${this.playerStats.hp} / ${this.playerStats.maxHp}`);
      this.playerMpText.setText(`${this.playerStats.mp} / ${this.playerStats.maxMp}`);
      
      this.playerHpBar.width = 280 * (this.playerStats.hp / this.playerStats.maxHp);
      this.playerMpBar.width = 280 * (this.playerStats.mp / this.playerStats.maxMp);

      this.isBagMenuOpen = false;
      this.bagMenuContainer.destroy();
      this.menuButtons.forEach(btn => btn.container.setVisible(true));
      this.enemyTurn();
    }
  }

  showDamage(x: number, y: number, damage: number, color: string) {
    const dmgText = this.add.text(x, y - 100, `-${damage}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: color,
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.time.delayedCall(1000, () => dmgText.destroy());
  }

  enemyTurn() {
    this.battleState = 'ENEMY_TURN';
    this.logMessage(`${this.enemyStats.name} attacks!`);

    const damage = Math.max(1, this.enemyStats.attack);
    this.playerStats.hp = Math.max(0, this.playerStats.hp - damage);
    
    this.playerHpText.setText(`${this.playerStats.hp} / ${this.playerStats.maxHp}`);
    this.playerHpBar.width = 280 * (this.playerStats.hp / this.playerStats.maxHp);
    
    this.showDamage(this.playerSprite.x, this.playerSprite.y, damage, '#ff5555');

    this.time.delayedCall(500, () => {
      if (this.playerStats.hp <= 0) {
        this.logMessage(`Player was defeated...`);
        this.endBattle(false);
      } else {
        this.menuButtons.forEach(btn => btn.container.setVisible(true));
        this.battleState = 'PLAYER_TURN';
      }
    });
  }

  endBattle(playerWon: boolean) {
    this.battleState = 'BATTLE_END';
    
    // Hide menu buttons
    this.menuButtons.forEach(btn => btn.container.setVisible(false));

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const panel = this.add.graphics();
    panel.setDepth(100);
    panel.fillStyle(0x1a051a, 0.9); // Dark gothic purple
    panel.lineStyle(4, 0xd4af37, 1); // Gold border
    panel.fillRect(width / 2 - 300, height / 2 - 200, 600, 400);
    panel.strokeRect(width / 2 - 300, height / 2 - 200, 600, 400);
    
    // Inner decorative line
    panel.lineStyle(1, 0xd4af37, 0.5);
    panel.strokeRect(width / 2 - 294, height / 2 - 194, 588, 388);

    let resultText = '';
    let expText = '';

    if (playerWon) {
      if (this.enemyStats.isBoss) {
        resultText = 'CONGRATULATIONS!';
        expText = 'You beat the game!\nPress any key to continue.';
        this.registry.set('bossDefeated', true);
        
        this.add.text(width / 2, height / 2 - 80, resultText, {
          fontFamily: 'Georgia, serif',
          fontSize: '64px',
          fontStyle: 'italic',
          color: '#d4af37'
        }).setOrigin(0.5).setDepth(101);

        this.add.text(width / 2, height / 2 + 60, expText, {
          fontFamily: 'Courier New',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }).setOrigin(0.5).setDepth(101);

        this.time.delayedCall(1000, () => {
          this.input.keyboard?.once('keydown', () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (camera: any, progress: number) => {
              if (progress === 1) {
                this.scene.stop('GameScene');
                this.scene.stop('UIScene');
                this.scene.start('StartScene');
              }
            });
          });
        });
        return; // Skip normal end battle logic
      }

      resultText = 'YOU WON!';
      const expGained = this.enemyStats.expReward;
      this.playerStats.exp += expGained;
      expText = `You gained ${expGained} EXP!`;

      if (this.playerStats.exp >= this.playerStats.expToNext) {
        this.playerStats.level++;
        this.playerStats.exp -= this.playerStats.expToNext;
        this.playerStats.expToNext = Math.floor(this.playerStats.expToNext * 1.5);
        this.playerStats.maxHp += 10;
        this.playerStats.hp = this.playerStats.maxHp;
        this.playerStats.maxMp += 5;
        this.playerStats.mp = this.playerStats.maxMp;
        this.playerStats.attack += 2;
        this.playerStats.speed += 1;
        
        expText = `Level Up! LV ${this.playerStats.level}\nHP: ${this.playerStats.maxHp} MP: ${this.playerStats.maxMp}\nATK: ${this.playerStats.attack} SPD: ${this.playerStats.speed}`;
        
        if (this.playerStats.level === 3) {
          this.playerStats.skills.push({ name: 'Fire Ball', cost: 10, damage: 12, type: 'magic' });
          expText += '\nLearned Fire Ball!';
        } else if (this.playerStats.level === 5) {
          this.playerStats.skills.push({ name: 'Dark Sword', cost: 15, damage: 20, type: 'physical' });
          expText += '\nLearned Dark Sword!';
        }
      }
      
      // 25% chance to drop a health potion
      if (Math.random() < 0.25) {
        this.playerStats.items.health_potion = (this.playerStats.items.health_potion || 0) + 1;
        expText += '\nDropped a Health Potion!';
      }
      // 25% chance to drop a mana potion
      if (Math.random() < 0.25) {
        this.playerStats.items.mana_potion = (this.playerStats.items.mana_potion || 0) + 1;
        expText += '\nDropped a Mana Potion!';
      }
    } else {
      resultText = 'YOU LOST...';
      this.playerStats.hp = 1; // Revive with 1 HP
    }

    this.registry.set('playerStats', this.playerStats);

    this.add.text(width / 2, height / 2 - 80, resultText, {
      fontFamily: 'Georgia, serif',
      fontSize: '64px',
      fontStyle: 'italic',
      color: playerWon ? '#d4af37' : '#ff0000'
    }).setOrigin(0.5).setDepth(101);

    this.add.text(width / 2, height / 2 + 60, expText, {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5).setDepth(101);

    this.time.delayedCall(3000, () => {
      this.scene.stop();
      this.scene.resume('GameScene');
      const gameScene = this.scene.get('GameScene') as any;
      gameScene.endEncounter();
    });
  }

  update() {
    if (this.isSkillMenuOpen && this.input.keyboard) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedSkillIndex = (this.selectedSkillIndex - 1 + this.skills.length) % this.skills.length;
            this.updateSkillMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedSkillIndex = (this.selectedSkillIndex + 1) % this.skills.length;
            this.updateSkillMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            if (this.skills.length > 0) {
                this.useSkill(this.skills[this.selectedSkillIndex]);
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.isSkillMenuOpen = false;
            this.skillMenuContainer.destroy();
            this.menuButtons.forEach(btn => btn.container.setVisible(true));
        }
        return;
    }

    if (this.isBagMenuOpen && this.input.keyboard) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedBagIndex = (this.selectedBagIndex - 1 + this.bagItems.length) % this.bagItems.length;
            this.updateBagMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedBagIndex = (this.selectedBagIndex + 1) % this.bagItems.length;
            this.updateBagMenu();
        } else if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            this.useItem(this.bagItems[this.selectedBagIndex]);
        } else if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.isBagMenuOpen = false;
            this.bagMenuContainer.destroy();
            this.menuButtons.forEach(btn => btn.container.setVisible(true));
        }
        return;
    }

    if (this.battleState === 'PLAYER_TURN' && this.input.keyboard) {
      let changed = false;
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        if (this.selectedMenuIndex >= 2) {
          this.selectedMenuIndex -= 2;
          changed = true;
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        if (this.selectedMenuIndex < 2) {
          this.selectedMenuIndex += 2;
          changed = true;
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        if (this.selectedMenuIndex % 2 === 1) {
          this.selectedMenuIndex -= 1;
          changed = true;
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        if (this.selectedMenuIndex % 2 === 0) {
          this.selectedMenuIndex += 1;
          changed = true;
        }
      }

      if (changed) {
        this.updateMenuSelection();
      }

      if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
        this.menuButtons[this.selectedMenuIndex].action();
      }
    }
  }
}

export default function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;
    if (gameInstance.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1920,
      height: 1080,
      parent: gameRef.current,
      audio: {
        noAudio: true
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [StartScene, GameScene, UIScene, BattleScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      pixelArt: true,
      backgroundColor: '#000000',
    };

    gameInstance.current = new Phaser.Game(config);

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 font-sans tracking-tight">Dark Blood</h1>
        <p className="text-neutral-400 text-sm">Use Arrow Keys to move. [X] Confirm, [C] Close, [O] Menu. <span className="text-red-500 font-bold block mt-1">Be careful of the Demon boss.</span></p>
      </div>
      <div 
        ref={gameRef} 
        className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-neutral-800 bg-black" 
      />
    </div>
  );
}
