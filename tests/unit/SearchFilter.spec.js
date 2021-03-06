import { shallowMount } from '@vue/test-utils';
import SearchFilter from '@/components/SearchFilter.vue';

/**
 * Skapa en komponent för sökning/filtrering. Komponenten ska innehålla ett textfält
 * samt visa en lista med alla element som matchar texten i textfältet.
 * Den ska uppdateras varje gång användaren trycker ner ett tecken.
 * Använd en lista med namn på djur
 * Använd följande tetfall:
 *    tom sträng matchar alla element
 *    "d" matchar "dog och goldfish"
 */
describe('SearchFilter.vue', () => {
  let wrapper, data, input;
  beforeEach(() => {
    data = [
      'cat',
      'dog',
      'parrot',
      'goldfish',
      'horse',
      'elephant',
      'ant',
      'snake',
      'crow',
      'cow',
      'eagle',
      'rhinoceros',
      'chimpanzee',
    ];
    wrapper = shallowMount(SearchFilter, {
      data: () => {
        return {
          animals: data,
        };
      },
    });
    input = wrapper.find('input');
  });
  it('should return a list of all 13 animal if the input field is empty', async () => {
    await input.setValue('');
    const list = wrapper.findAll('li').length;
    expect(list).toEqual(data.length);
  });
  // Test with Array.some that returns true or false
  it('should return both "dog" and "goldfish" when searching för "d"', async () => {
    await input.setValue('d');
    const filteredAnilmals = wrapper.findAll('ul > li').wrappers;
    const hasDog = filteredAnilmals.some((li) => li.text() === 'dog');
    const hasGoldfish = filteredAnilmals.some((li) => li.text() === 'goldfish');
    expect(hasDog && hasGoldfish).toBe(true);
    expect(filteredAnilmals.length).toBe(2);
  });
  // Test with finding text in the list
  it('should return both "crow" and "cow" when searching for "ow"', async () => {
    await input.setValue('ow');
    const list = wrapper.find('ul').text();
    expect(list).toContain('crow');
    expect(list).toContain('cow');
  });
});
