import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router';
import ReduxForm, { PollForm } from '../PollForm';

let props;
let wrapper;

describe('PollForm', () => {
  beforeEach(() => {
    props = {
      onPollSubmit: jest.fn(),
      handleSubmit: jest.fn()
    };

    wrapper = shallow(<PollForm {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a Form component', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  // TODO: Add owner field to form as a hidden field
  // xit('shows a hidden `Owner` field', () => {
  //   expect(wrapper.find('input[name="owner"]').exists()).toBe(true);
  // });

  it('should ask for a question', () => {
    expect(wrapper.find('Field[name="question"]').exists()).toBe(true);
  });

  it('should ask for choices', () => {
    expect(wrapper.find('FieldArray[name="choices"]').exists()).toBe(true);
  });

  it('shows a `Preview` button', () => {
    expect(wrapper.find('.btn-preview').exists()).toBe(true);
  });

  it('shows a `Cancel` button', () => {
    expect(wrapper.find('.btn-cancel').exists()).toBe(true);
  });

  describe('when the `Preview` button is clicked', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        combineReducers({ form: formReducer }),
        applyMiddleware(thunk)
      );
      const initialValues = { choices: [0, 1] };

      wrapper = mount(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ReduxForm {...props} initialValues={initialValues} />
          </StaticRouter>
        </Provider>
      );
    });

    it('submits the form', () => {
      wrapper.find('Button.btn-preview').simulate('click');
      expect(props.handleSubmit).toHaveBeenCalled();
    });

    describe('when the form validation fails', () => {
      beforeEach(() => {
        wrapper.find('input[name="question"]').simulate('change', {
          target: { value: 'Would you like to play a game?' }
        });
        wrapper.find('Button.btn-preview').simulate('click');
        expect(props.handleSubmit).toHaveBeenCalled();
      });

      it('shows an error', () => {
        const form = store.getState().form.pollForm;
        expect(form.values.question).toBe('Would you like to play a game?');
        expect(form.syncErrors.choice_1).toBe(
          'You must provide text for Choice 1'
        );
        expect(form.syncErrors.choice_2).toBe(
          'You must provide text for Choice 2'
        );
      });
    });

    describe('when the form validation succeeds', () => {
      beforeEach(() => {
        wrapper.find('input[name="question"]').simulate('change', {
          target: { value: 'Would you like to play a game?' }
        });
        wrapper
          .find('input[name="choice_1"]')
          .simulate('change', { target: { value: 'Yes' } });
        wrapper
          .find('input[name="choice_2"]')
          .simulate('change', { target: { value: 'No' } });
        wrapper.find('Button.btn-preview').simulate('click');
        expect(props.handleSubmit).toHaveBeenCalled();
      });

      // TODO: Add a test to confirm user is shown the next component
      it('does not show any errors', () => {
        const form = store.getState().form.pollForm;
        expect(form.values.question).toBe('Would you like to play a game?');
        expect(form.values.choice_1).toBe('Yes');
        expect(form.values.choice_2).toBe('No');
        expect(form.syncErrors).toBeUndefined();
      });
    });
  });

  describe('when the `Cancel` button is clicked', () => {
    it('returns to the Dashboard when Back button is clicked', () => {
      expect(wrapper.find('.btn-cancel').props().to).toEqual('/polls');
    });
  });

  describe('renderChoices', () => {
    let store;

    beforeEach(() => {
      store = createStore(combineReducers({ form: formReducer }));
    });

    describe('when there are 2 choices', () => {
      beforeEach(() => {
        const initialValues = { choices: [0, 1] };

        wrapper = mount(
          <Provider store={store}>
            <StaticRouter context={{}}>
              <ReduxForm {...props} initialValues={initialValues} />
            </StaticRouter>
          </Provider>
        );
      });

      it('shows an enabled `Add Choice` button', () => {
        expect(wrapper.find('Button.btn-add-choice').exists()).toBe(true);
        expect(wrapper.find('Button.btn-add-choice').hasClass('disabled')).toBe(
          false
        );
      });

      it('allows the user to add an additional choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(2);
        wrapper.find('Button.btn-add-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(3);
      });

      it('shows a disabled `Remove Choice` button', () => {
        expect(wrapper.find('Button.btn-remove-choice').exists()).toBe(true);
        expect(
          wrapper.find('Button.btn-remove-choice').hasClass('disabled')
        ).toBe(true);
      });

      it('prevents the user from removing an existing choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(2);
        wrapper.find('Button.btn-remove-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(2);
      });
    });

    describe('when there are 3 choices', () => {
      beforeEach(() => {
        const initialValues = { choices: [0, 1, 2] };

        wrapper = mount(
          <Provider store={store}>
            <StaticRouter context={{}}>
              <ReduxForm {...props} initialValues={initialValues} />
            </StaticRouter>
          </Provider>
        );
      });

      it('shows an enabled `Add Choice` button', () => {
        expect(wrapper.find('Button.btn-add-choice').exists()).toBe(true);
        expect(wrapper.find('Button.btn-add-choice').hasClass('disabled')).toBe(
          false
        );
      });

      it('allows the user to add an additional choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(3);
        wrapper.find('Button.btn-add-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(4);
      });

      it('shows an enabled `Remove Choice` button', () => {
        expect(wrapper.find('Button.btn-remove-choice').exists()).toBe(true);
        expect(
          wrapper.find('Button.btn-remove-choice').hasClass('disabled')
        ).toBe(false);
      });

      it('allows the user to remove an existing choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(3);
        wrapper.find('Button.btn-remove-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(2);
      });
    });

    describe('when there are 4 choices', () => {
      beforeEach(() => {
        const initialValues = { choices: [0, 1, 2, 3] };

        wrapper = mount(
          <Provider store={store}>
            <StaticRouter context={{}}>
              <ReduxForm {...props} initialValues={initialValues} />
            </StaticRouter>
          </Provider>
        );
      });

      it('shows an enabled `Add Choice` button', () => {
        expect(wrapper.find('Button.btn-add-choice').exists()).toBe(true);
        expect(wrapper.find('Button.btn-add-choice').hasClass('disabled')).toBe(
          false
        );
      });

      it('allows the user to add an additional choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(4);
        wrapper.find('Button.btn-add-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(5);
      });

      it('shows an enabled `Remove Choice` button', () => {
        expect(wrapper.find('Button.btn-remove-choice').exists()).toBe(true);
        expect(
          wrapper.find('Button.btn-remove-choice').hasClass('disabled')
        ).toBe(false);
      });

      it('allows the user to remove an existing choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(4);
        wrapper.find('Button.btn-remove-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(3);
      });
    });

    describe('when there are 5 choices', () => {
      beforeEach(() => {
        const initialValues = { choices: [0, 1, 2, 3, 4] };

        wrapper = mount(
          <Provider store={store}>
            <StaticRouter context={{}}>
              <ReduxForm {...props} initialValues={initialValues} />
            </StaticRouter>
          </Provider>
        );
      });

      it('shows an enabled `Add Choice` button', () => {
        expect(wrapper.find('Button.btn-add-choice').exists()).toBe(true);
        expect(wrapper.find('Button.btn-add-choice').hasClass('disabled')).toBe(
          false
        );
      });

      it('allows the user to add an additional choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(5);
        wrapper.find('Button.btn-add-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(6);
      });

      it('shows an enabled `Remove Choice` button', () => {
        expect(wrapper.find('Button.btn-remove-choice').exists()).toBe(true);
        expect(
          wrapper.find('Button.btn-remove-choice').hasClass('disabled')
        ).toBe(false);
      });

      it('allows the user to remove an existing choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(5);
        wrapper.find('Button.btn-remove-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(4);
      });
    });

    describe('when there are 6 choices', () => {
      beforeEach(() => {
        const initialValues = { choices: [0, 1, 2, 3, 4, 5] };

        wrapper = mount(
          <Provider store={store}>
            <StaticRouter context={{}}>
              <ReduxForm {...props} initialValues={initialValues} />
            </StaticRouter>
          </Provider>
        );
      });

      it('shows a disabled `Add Choice` button', () => {
        expect(wrapper.find('Button.btn-add-choice').exists()).toBe(true);
        expect(wrapper.find('Button.btn-add-choice').hasClass('disabled')).toBe(
          true
        );
      });

      it('prevents the user from adding an additional choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(6);
        wrapper.find('Button.btn-add-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(6);
      });

      it('shows an enabled `Remove Choice` button', () => {
        expect(wrapper.find('Button.btn-remove-choice').exists()).toBe(true);
        expect(
          wrapper.find('Button.btn-remove-choice').hasClass('disabled')
        ).toBe(false);
      });

      it('allows the user to remove an existing choice', () => {
        expect(store.getState().form.pollForm.values.choices.length).toEqual(6);
        wrapper.find('Button.btn-remove-choice').simulate('click');
        expect(store.getState().form.pollForm.values.choices.length).toEqual(5);
      });
    });
  });
});
