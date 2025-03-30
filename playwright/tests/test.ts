import {expect, test} from "@playwright/test";
import { CreateMonsterPage } from "../pages/CreateMonsterPage";
import fs from "node:fs";


let data: {
    monsters: any;
};

data = JSON.parse(fs.readFileSync(`./monster_project_tests/test-data/monsters.json`, 'utf-8'));

[
    // Setup monster information
    { data },
].forEach(({ data }) => {
    test.describe('Create Monster Tests', () => {
        let createMonster: CreateMonsterPage;

        test.beforeEach( async ({ page }) => {
            createMonster = new CreateMonsterPage(page);
            await createMonster.goToMonsterPage();
        });

        test('Verify that a user can create a monster', async ({ page }) => {

            // Arrange
            // Select monster image, write name, hp, attack defense and speed
            await createMonster.pickMonsterImageById(data.monsters.monster1.id);
            await createMonster.addMonsterName(data.monsters.monster1.name);
            await createMonster.addMonsterHp(data.monsters.monster1.hp);
            await createMonster.addMonsterAttack(data.monsters.monster1.attack);
            await createMonster.addMonsterDefense(data.monsters.monster1.defense);
            await createMonster.addMonsterSpeed(data.monsters.monster1.speed);

            // Act
            // Click create monster button
            await createMonster.clickCreateMonsterButton();

            // Assert
            // Verify that created monster card is displayed on Your Monsters area
            expect(await createMonster.getMonsterAreaTitle()).toContain('Your Monsters');
            expect(await createMonster.getMonsterCardTitle()).toContain(data.monsters.monster1.name);

        });

        test('Verify that a user can delete a created monster', async ({ page }) => {

            // Arrange
            // Select monster image, write name, hp, attack defense and speed
            await createMonster.pickMonsterImageById(data.monsters.monster1.id);
            await createMonster.addMonsterName(data.monsters.monster1.name);
            await createMonster.addMonsterHp(data.monsters.monster1.hp);
            await createMonster.addMonsterAttack(data.monsters.monster1.attack);
            await createMonster.addMonsterDefense(data.monsters.monster1.defense);
            await createMonster.addMonsterSpeed(data.monsters.monster1.speed);

            await createMonster.clickCreateMonsterButton();

            // Act
            // Click delete button on Your Monsters area
            await createMonster.clickDeleteMonsterButton();

            // Assert
            // Verify that created monster card is displayed on Your Monsters area
            expect(await createMonster.getMonsterAreaTitle()).not.toContain('Your Monsters');
            expect(await createMonster.getMonsterAreaTitle()).toContain('There are no monsters');

        });

        test('Verify that a user can favorite a created monster', async ({ page }) => {

            // Arrange
            // Select monster image, write name, hp, attack defense and speed
            await createMonster.pickMonsterImageById(data.monsters.monster1.id);
            await createMonster.addMonsterName(data.monsters.monster1.name);
            await createMonster.addMonsterHp(data.monsters.monster1.hp);
            await createMonster.addMonsterAttack(data.monsters.monster1.attack);
            await createMonster.addMonsterDefense(data.monsters.monster1.defense);
            await createMonster.addMonsterSpeed(data.monsters.monster1.speed);

            // Click Create Monster
            await createMonster.clickCreateMonsterButton();

            // Act
            // Click favorite icon button on Your Monsters area
            await createMonster.clickFavoriteIconButton();

            // Assert
            // Verify that created monster card is displayed on Your Monsters area
            expect(await createMonster.getMonsterAreaTitle()).toContain('Your Monsters');
            expect(await createMonster.getFavoriteIconButtonColor()).toContain('red');

        });

        test('Verify that a user can not add a string for HP value', async ({ page }) => {

            // Arrange
            // Select monster image, write name, hp, attack defense and speed
            // Add text value for HP
            await createMonster.pickMonsterImageById(data.monsters.monster1.id);
            await createMonster.addMonsterName(data.monsters.monster1.name);
            await createMonster.addMonsterHp("text");
            await createMonster.addMonsterAttack(data.monsters.monster1.attack);
            await createMonster.addMonsterDefense(data.monsters.monster1.defense);
            await createMonster.addMonsterSpeed(data.monsters.monster1.speed);

            // Act
            // Click Create Monster
            await createMonster.clickCreateMonsterButton();

            // Assert
            // Verify that user is able to see error message
            expect(await createMonster.getMonsterAreaTitle()).not.toContain('Your Monsters');
            expect(await createMonster.getErrorMessage()).toContain('All fields are required');

        });

    });
});