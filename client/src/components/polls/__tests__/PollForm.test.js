import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { StaticRouter } from 'react-router';
import ReduxForm, { PollForm } from '../PollForm';
import reducers from '../../../reducers';

let props;
let wrapper;

describe('PollForm', () => {
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
      waiting: false,
      error: null
    };

    wrapper = shallow(<PollForm {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a Form component', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should ask for a question', () => {
    expect(wrapper.find('Field[name="question"]').length).toEqual(1);
  });

  it('should ask for choices', () => {
    expect(wrapper.find('FieldArray[name="choices"]').length).toEqual(1);
  });

  it('shows a `Next` button', () => {
    expect(wrapper.find('.btn-next').length).toEqual(1);
  });

  it('does NOT show a `Delete Poll` button', () => {
    expect(wrapper.find('.btn-delete').length).toEqual(0);
  });

  it('shows a `Cancel` button', () => {
    expect(wrapper.find('.btn-back').length).toEqual(1);
  });

  describe('when the `Next` button is clicked', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        reducers,
        applyMiddleware(reduxThunk, promiseMiddleware)
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
      wrapper.find('Button.btn-next').simulate('click');
      expect(props.handleSubmit).toHaveBeenCalled();
    });

    describe('when the form validation fails', () => {
      beforeEach(() => {
        wrapper.find('input[name="question"]').simulate('change', {
          target: { value: 'Would you like to play a game?' }
        });
        wrapper.find('Button.btn-next').simulate('click');
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
        wrapper.find('Button.btn-next').simulate('click');
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
    it('executes the `onCancel` callback', () => {
      wrapper.find('Button.btn-back').simulate('click');
      expect(props.onCancel).toHaveBeenCalled();
    });
  });

  describe('when the Delete Poll button is present', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        reducers,
        applyMiddleware(reduxThunk, promiseMiddleware)
      );
      props.onDelete = jest.fn();
      const initialValues = { choices: [0, 1] };

      wrapper = mount(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ReduxForm {...props} initialValues={initialValues} />
          </StaticRouter>
        </Provider>
      );
    });

    describe('when the Delete Poll button is clicked', () => {
      it('executes the `onDelete` callback in props', () => {
        wrapper.find('Button.btn-delete').simulate('click');
        expect(props.onDelete).toHaveBeenCalled();
      });

      describe('when the delete operation is waiting', () => {
        beforeEach(() => {
          wrapper = shallow(<PollForm {...props} waiting={true} />);
        });

        it('can show a loading spinner during delete', () => {
          expect(wrapper.find('ProgressBar').length).toEqual(1);
        });
      });

      describe('when the delete operation fails', () => {
        beforeEach(() => {
          wrapper = shallow(
            <PollForm
              {...props}
              error={{ response: { data: { error: 'owch!' } } }}
            />
          );
        });

        it('can show an error message', () => {
          expect(wrapper.find('Row.error').length).toEqual(1);
        });
      });
    });
  });

  describe('when `initialValues` are present', () => {
    let store;
    let initialValues;

    beforeEach(() => {
      store = createStore(
        reducers,
        applyMiddleware(reduxThunk, promiseMiddleware)
      );
      initialValues = {
        question: 'What should I choose?',
        choices: [0, 1, 2, 3],
        choice_1: 'choice 1',
        choice_2: 'choice 2',
        choice_3: 'choice 3',
        choice_4: 'choice 4'
      };

      wrapper = mount(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ReduxForm {...props} initialValues={initialValues} />
          </StaticRouter>
        </Provider>
      );
    });

    it('populates the question with initial values', () => {
      expect(store.getState().form.pollForm.values.question).toEqual(
        'What should I choose?'
      );
    });

    it('populates the choices with initial values', () => {
      expect(store.getState().form.pollForm.values.choices.length).toEqual(4);
      initialValues.choices.forEach((value, i) => {
        expect(
          store.getState().form.pollForm.values[`choice_${i + 1}`]
        ).toEqual(`choice ${i + 1}`);
      });
    });
  });

  describe('renderChoices', () => {
    let store;

    beforeEach(() => {
      store = createStore(reducers);
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
