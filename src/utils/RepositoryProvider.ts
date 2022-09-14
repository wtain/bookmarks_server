import { Application } from 'express';
import EntityRepository from '../app/domain/repository/EntityRepository';

type RepositoryProvider = (req: { app: Application }) => EntityRepository;

export default RepositoryProvider;