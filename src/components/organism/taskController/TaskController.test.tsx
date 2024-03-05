import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import TaskController from './TaskController';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

Storage.prototype.getItem = jest.fn(() => null);
Storage.prototype.setItem = jest.fn();

describe('TaskController component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders TaskController component', () => {
        (useSelector as jest.Mock).mockReturnValueOnce([]);

        render(<TaskController />);

        const taskControllerElement = screen.getByTestId('task-controller');
        expect(taskControllerElement).toBeInTheDocument();

        const inputElement = screen.getByPlaceholderText('Search tasks...') as HTMLInputElement;
        expect(inputElement).toBeInTheDocument();
    });
});
