import { test, expect } from '@playwright/test'

test.describe('AXIS', () => {

  test('Успешное заполнение формы заказа', async ({ page }) => {
    await page.goto('/')
    
    const headerButton = page.locator('header button:has-text("Сделать заказ")').first()
    await headerButton.click()

    const modal = page.locator('body > div').filter({ has: page.locator('h2:has-text("Оформить")') }).first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    await modal.getByLabel(/Полное имя/i).fill('Ivan Designer');
    await modal.getByLabel(/Email/i).fill('ivan.designer@example.com');
    
    const selectedLot = 'Certina OBSIDIAN';
    await modal.locator('#lot-select').selectOption(selectedLot);

    await modal.getByRole('button', { name: /Отправить/i }).click();

    const successModal = page.locator('body > div').filter({ has: page.locator('h3:has-text("Запрос Принят")') }).first()
    await expect(successModal).toBeVisible({ timeout: 7000 });

    await expect(successModal.locator('p', { hasText: selectedLot })).toBeVisible();

    await expect(successModal).not.toBeVisible({ timeout: 10000 });
  });

  test('Отправка формы контактов и проверка анимации успеха', async ({ page }) => {
    await page.goto('/')
    
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()

    await contactSection.getByLabel('ФИО').fill('Aleksei Frontend')
    await contactSection.getByLabel('Email').fill('dev@axis-archive.com')
    await contactSection.getByLabel('Сообщение / Интересный лот').fill('Интересует лот Monolith')

    await contactSection.locator('input[type="checkbox"]').check({ force: true })

    await contactSection.getByRole('button', { name: /Отправить заявку/i }).click()
    
    await expect(contactSection.locator('form')).toBeHidden({ timeout: 5000 })
    
    const successMessage = contactSection.locator('h3:has-text("Заявка принята")')
    await expect(successMessage).toBeVisible()
    
    await contactSection.getByRole('button', { name: /Отправить еще раз/i }).click()

    await expect(successMessage).toBeHidden()
    const nameInput = contactSection.getByLabel('ФИО')
    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveValue('')
})
})