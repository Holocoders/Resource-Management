import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { NodeService } from '../node/node.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UserService } from '../user/user.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @Inject(forwardRef(() => NodeService)) private nodeService: NodeService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async isSuperAdmin(userId: string) {
    const result = await this.permissionModel.findOne({
      userId: userId as any,
      nodeId: null,
    });
    return result != null;
  }

  async isAdmin(userId: any, nodeId: any) {
    const isSuperAdmin = await this.isSuperAdmin(userId);
    if (isSuperAdmin) {
      return true;
    }
    const parents = await this.nodeService.getParentIDs(nodeId);
    const permissions = await this.permissionModel.find({
      userId: userId as any,
      nodeId: { $in: parents },
    });
    return permissions.length > 0;
  }

  async create(userId: string, nodeId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const createNodeInput = new CreatePermissionInput(userId, nodeId);
    const PermissionDocument = new this.permissionModel(createNodeInput);
    const permission = await PermissionDocument.save();
    return permission._id;
  }

  findAll(id: string) {
    return this.permissionModel.find({ nodeId: id as any });
  }
}
