import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  RecycleTable,
  RecycleTableContentList,
  RecycleTableContentListItem,
  RecycleTableList,
  RecycleTableListItem,
} from '../../components/recycle-table';

import {
  SwipeableView,
  SwipeableViewBackground,
  SwipeableViewContent,
} from '../../components/swipeable-view';

import {
  List,
  ListItem,
} from '../../components/list';

export class TasksTabContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  public render() {
    const tasks = this.props.tasks;
    const labels = this.props.labels.filter((label: any) => label.visibled);
    const actions = this.props.actions;
    return (
      <RecycleTable>
        <RecycleTableList>
          {labels.map((label: any, index: number) => {
            return <RecycleTableListItem key={label.id} index={index}>{label.name}</RecycleTableListItem>;
          })}
        </RecycleTableList>

        <RecycleTableContentList>
          {labels.map((label: any, index: number) => {
            const groupedTasks = tasks.filter((task: any) => {
              return (task.labelId === label.id);
            });
            return (
              <RecycleTableContentListItem key={index}>
                <List
                  onSort={(from: number, to: number) => {
                    const task = groupedTasks[from];
                    actions.sortTask(task.id, to);
                  }}
                >
                  {groupedTasks.map((task: any) => {
                    return (
                      <ListItem key={task.id}>
                        <SwipeableView
                          onSwipeLeft={() => {actions.deleteTask(task.id);}}
                          onSwipeRight={() => {actions.updateTask(task.id, {completed: !task.completed});}}
                          throughLeft={true}
                          >
                          <SwipeableViewBackground position="left"><span>L</span></SwipeableViewBackground>
                          <SwipeableViewContent onClick={() => this.context.move(`/tasks/${task.id}/edit`)}>
                            <div className={classNames('task-list-item', {'task-list-item__completed': task.completed})}>{task.text}</div>
                          </SwipeableViewContent>
                          <SwipeableViewBackground position="right"><span>R</span></SwipeableViewBackground>
                        </SwipeableView>
                      </ListItem>
                    );
                  })}
                </List>
              </RecycleTableContentListItem>
            );
          })}
        </RecycleTableContentList>
      </RecycleTable>
    );
  }
}
